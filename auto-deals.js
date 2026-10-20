const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// auto-deals.js
// Learns real prices from Andertons product pages (JSON-LD) for watchlisted
// products, and lists a deal ONLY when the store page itself declares an
// offer (strike-through was-price with class "line-through" next to the live
// "pdp-price"). No strike-through on the page = no deal, and the running
// baseline is reset to the live price so stale deals disappear automatically.
// NEVER invents prices: everything read from the store (live price from
// JSON-LD, was-price from the store's own strike-through).
//
// Manual verified deals (checked by the bot in a session via real web search)
// live in data/manual-deals.json and are merged in on every run.

const OUT_DIR = __dirname;
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'products.json'), 'utf8'));
const HISTORY_FILE = path.join(OUT_DIR, 'data', 'price-history.json');
const DEALS_FILE = path.join(OUT_DIR, 'data', 'deals.json');
const MANUAL_FILE = path.join(OUT_DIR, 'data', 'manual-deals.json');
const DEAL_IMG_FILE = path.join(OUT_DIR, 'data', 'deals-images.json');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const MIN_DROP_PCT = 0.05;   // need >=5% observed drop to call it a deal
const CONCURRENCY = 4;
const FETCH_TIMEOUT = 20000;

function byTitle(t) {
  return PRODUCTS.find(p => (p.title || '').toLowerCase() === (t || '').toLowerCase())
    || PRODUCTS.find(p => (p.title || '').toLowerCase().indexOf((t || '').toLowerCase()) > -1);
}

// Fotos de ofertas guardadas en el repo (nunca se enlaza la tienda de origen).
// Si una oferta manual trae una URL nueva, se descarga aqui y queda local.
const dealImgMap = fs.existsSync(DEAL_IMG_FILE) ? JSON.parse(fs.readFileSync(DEAL_IMG_FILE, 'utf8')) : {};
const productImgById = new Map(PRODUCTS.map(p => [p.id, p.img || '']));

async function localizeDealImg(deal) {
  const url = deal.img || '';
  if (!url || !/^https?:/i.test(url)) return;
  const fromProduct = deal.product_id != null ? productImgById.get(deal.product_id) : '';
  if (fromProduct && !/^https?:/i.test(fromProduct)) { deal.img = fromProduct; return; }
  if (dealImgMap[url]) { deal.img = dealImgMap[url]; return; }
  try {
    const ctrl = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(FETCH_TIMEOUT) : undefined;
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8' }, signal: ctrl });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const type = (r.headers.get('content-type') || '').toLowerCase();
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('gif') ? 'gif' : 'jpg';
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.length) throw new Error('respuesta vacia');
    const key = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
    const rel = 'img/products/' + key + '.' + ext;
    fs.writeFileSync(path.join(OUT_DIR, rel), buf);
    dealImgMap[url] = rel;
    fs.writeFileSync(DEAL_IMG_FILE, JSON.stringify(dealImgMap, null, 2) + '\n', 'utf8');
    deal.img = rel;
    console.log('auto-deals: foto guardada para "' + deal.title + '" -> ' + rel);
  } catch (e) {
    console.log('auto-deals: no se pudo guardar la foto de "' + deal.title + '": ' + e.message);
  }
}

async function fetchWithTimeout(url, ms) {
  const ctrl = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(ms) : undefined;
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, signal: ctrl });
  const html = await r.text();
  return { status: r.status, html };
}

function parsePrice(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    try {
      const o = JSON.parse(b[1]);
      if (o && o['@type'] && /Product/i.test(o['@type']) && o.offers) {
        const offer = Array.isArray(o.offers) ? o.offers[0] : o.offers;
        const price = Number(offer && (offer.price !== undefined ? offer.price : offer.highPrice));
        if (isFinite(price) && price > 0) {
          return { price, currency: (offer && (offer.priceCurrency || 'GBP')) || 'GBP' };
        }
      }
    } catch (e) { /* skip */ }
  }
  const m = html.match(/"price"\s*:\s*"?(?:[A-Z]{3}\s*)?(\d+(?:\.\d+)?)"?/);
  if (m && isFinite(Number(m[1])) && Number(m[1]) > 0) return { price: Number(m[1]), currency: 'GBP' };
  return null;
}

// Store-declared was-price: the strike-through figure next to the live price
// (class "line-through" on real offer pages, e.g. "Save £10.00!" badges).
// Returns null when the page shows no offer.
function parseWas(html) {
  const m = html.match(/line-through[^>]*>\s*£?\s*([\d,]+(?:\.\d+)?)/);
  if (!m) return null;
  const v = Number(m[1].replace(/,/g, ''));
  return isFinite(v) && v > 0 ? v : null;
}

function loadHistory() {
  try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { return {}; }
}

function saveHistory(h) { fs.writeFileSync(HISTORY_FILE, JSON.stringify(h, null, 1), 'utf8'); }

function loadManual() {
  try { return JSON.parse(fs.readFileSync(MANUAL_FILE, 'utf8')); } catch (e) { return []; }
}

// Re-check manual Andertons deals against the live store page. Drops the ones
// whose offer expired (no strike-through was-price). Returns the kept list.
async function verifyManual(manual) {
  const keep = [];
  for (const d of manual) {
    if (d.store !== 'andertons' || !d.store_url) { keep.push(d); continue; }
    try {
      const { status, html } = await fetchWithTimeout(derefAffiliate(d.store_url), FETCH_TIMEOUT);
      if (status !== 200) { keep.push(d); continue; } // transient error: keep, retry tomorrow
      const was = parseWas(html);
      const live = parsePrice(html);
      if (was && live && was > live.price && (was - live.price) / was >= MIN_DROP_PCT) {
        d.price = live.price; d.old_price = Math.round(was * 100) / 100;
        const sym = d.currency || '£';
        const sv = was - live.price;
        d.badge_en = `Save ${sym}${sv.toFixed(sv % 1 ? 1 : 0)}`;
        d.badge_es = `Ahorra ${sym}${sv.toFixed(sv % 1 ? 1 : 0)}`;
        keep.push(d);
      } else {
        console.log(`  manual expired, dropped: ${d.title}`);
      }
    } catch (e) { keep.push(d); }
    await wait(250);
  }
  return keep;
}

async function worker(items, history, results) {
  const queue = [...items];
  const run = async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        const { status, html } = await fetchWithTimeout(item.andertons, FETCH_TIMEOUT);
        if (status !== 200) { wait(300); continue; }
        const parsed = parsePrice(html);
        if (!parsed) { wait(300); continue; }
        const was = parseWas(html);
        results.push({ product: item, live: parsed, was });
        console.log(`  ${item.title}: ${parsed.currency}${parsed.price}${was && was > parsed.price ? ` (offer, was ${parsed.currency}${was})` : ' (no offer on page)'}`);
      } catch (e) {
        console.log(`  ${item.title}: fetch error (${e.message})`);
      }
      await wait(250);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length || 1) }, run));
}

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

// Resolve an affiliate-wrapped or affiliate-tagged URL back to the clean
// direct store URL before scraping. The bot has no affiliate cookies (Awin,
// Impact, CJ, Amazon, Plugin Boutique), so opening a wrapped/tagged URL would
// burn a click with no chance of a conversion. Supports:
//   - Awin:   https://www.awin1.com/cread.php?...&ued=<encoded direct url>
//   - direct store + tracking param: andertons.co.uk/...?irgwc=1&irpid=...
// If the URL isn't wrapped/tagged, it's returned unchanged.
function derefAffiliate(url) {
  const u = String(url || '');
  const m = u.match(/[?&]ued=([^&]*)/);
  if (m && m[1]) {
    try { return decodeURIComponent(m[1]); } catch (e) { /* fall back to raw match */ }
    return m[1];
  }
  // Strip tracking params that would register an affiliate click on scrapes.
  return u
    .replace(/([&?])irgwc=[^&]*/, '$1')
    .replace(/([&?])irpid=[^&]*/, '$1')
    .replace(/[&?](?:a_aid|tag|url)=[^&]*/g, '')
    .replace(/[?&]+$/g, '')
    .replace(/[?]&/g, '?')
    .replace(/\?{2,}/g, '?');
}

async function main() {
  // Build watchlist: products that have an Andertons buy link AND appear in
  // at least one guide (no orphan deals for products the site doesn't cover).
  const GUIDES = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'guides.json'), 'utf8'));
  const used = new Set();
  for (const gd of GUIDES) {
    for (const arr of [gd.featuredProducts || [], gd.products || []]) for (const id of arr) used.add(id);
    for (const s of (gd.sections || [])) for (const id of (s.products || [])) used.add(id);
  }
  const watchlist = PRODUCTS.filter(p => p.stores && p.stores.andertons && used.has(p.id)).map(p => ({ id: p.id, title: p.title, priceUsd: p.price, img: p.img, andertons: derefAffiliate(p.stores.andertons) }));
  console.log('auto-deals: watchlist =', watchlist.length, 'products');

  const history = loadHistory();
  const results = [];
  await worker(watchlist, history, results);

  // SAFEGUARD: total block (all fetches 403) must never wipe the page.
  // Keep previous deals.json untouched and skip the build.
  if (!results.length) {
    console.log('auto-deals: WARNING 0/' + watchlist.length + ' pages readable (store blocking?) — keeping previous deals.json');
    return;
  }

  // Update price history. Baseline rule: the store page is the truth.
  // Offer on page (strike-through was-price) -> baseline = was, deal open.
  // No offer on page -> baseline = live price (stale deals close by themselves).
  for (const r of results) {
    const key = String(r.product.id);
    const rec = history[key] || { firstSeen: r.live.price, normal: r.live.price, low: r.live.price, lastPrice: r.live.price, lastSeen: new Date().toISOString().slice(0, 10) };
    rec.lastPrice = r.live.price;
    rec.lastSeen = new Date().toISOString().slice(0, 10);
    rec.low = Math.min(rec.low, r.live.price);
    if (r.was && r.was > r.live.price) {
      rec.normal = r.was;
    } else {
      rec.normal = r.live.price;
    }
    history[key] = rec;
  }
  saveHistory(history);

  // Build active deals: only store-declared offers with a real (>=5%) saving.
  const autoDeals = [];
  for (const r of results) {
    if (!(r.was && r.was > r.live.price)) continue;
    const saving = r.was - r.live.price;
    if (saving <= 0 || saving / r.was < MIN_DROP_PCT) continue;
    const key = String(r.product.id);
    const rec = history[key];
    {
      const prod = byTitle(r.product.title);
      const cur = r.live.currency || 'GBP';
      const sym = cur === 'GBP' ? '£' : (cur === 'EUR' ? '€' : '$');
      autoDeals.push({
        product_id: r.product.id,
        title: r.product.title,
        title_es: (prod && prod.title_es) || r.product.title,
        price: r.live.price,
        old_price: Math.round(r.was * 100) / 100,
        currency: sym,
        store: 'andertons',
        store_url: r.product.andertons,
        img: r.product.img,
        badge_en: `Save ${sym}${(saving).toFixed(saving % 1 ? 1 : 0)}`,
        badge_es: `Ahorra ${sym}${(saving).toFixed(saving % 1 ? 1 : 0)}`,
        desc: (prod && prod.desc) || r.product.title,
        desc_es: (prod && prod.desc_es) || r.product.title_es || r.product.title,
        date_added: rec.lastSeen,
        source: 'auto'
      });
    }
  }

  // Merge manual verified deals. Manual Andertons deals are re-verified too:
  // if the store page no longer shows a strike-through offer, the manual
  // deal expired and is dropped automatically. Other stores can't be scraped
  // (bot blocking), so those manual deals are kept as-is.
  const manual = await verifyManual(loadManual());
  const merged = [];
  const seenId = new Set();
  const seenTitle = new Set();
  for (const d of [...autoDeals, ...manual]) {
    if (d.product_id != null && seenId.has(d.product_id)) continue;
    if (seenTitle.has(d.title)) continue;
    if (d.product_id != null) seenId.add(d.product_id);
    seenTitle.add(d.title);
    await localizeDealImg(d);
    merged.push(d);
  }

  fs.writeFileSync(DEALS_FILE, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log('auto-deals: wrote', merged.length, 'deals (auto=' + autoDeals.length + ', manual=' + manual.length + ')');

  try { execSync('node build-deals.js', { cwd: OUT_DIR, stdio: 'inherit' }); } catch (e) { console.log('build-deals failed:', e.message); }
}

main().catch(e => { console.error('auto-deals error:', e); process.exit(1); });