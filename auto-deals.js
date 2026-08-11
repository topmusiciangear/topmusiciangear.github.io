const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// auto-deals.js
// Learns real prices from Andertons product pages (JSON-LD) for watchlisted
// products, tracks a running "normal" price per product, and auto-adds a deal
// when the live price drops below normal (observed price drop = real deal).
// When the price returns to normal (>= baseline), the deal is removed
// automatically. NEVER invents prices: everything read from the store.
//
// Manual verified deals (checked by the bot in a session via real web search)
// live in data/manual-deals.json and are merged in on every run.

const OUT_DIR = __dirname;
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'products.json'), 'utf8'));
const HISTORY_FILE = path.join(OUT_DIR, 'data', 'price-history.json');
const DEALS_FILE = path.join(OUT_DIR, 'data', 'deals.json');
const MANUAL_FILE = path.join(OUT_DIR, 'data', 'manual-deals.json');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const MIN_DROP_PCT = 0.05;   // need >=5% observed drop to call it a deal
const CONCURRENCY = 4;
const FETCH_TIMEOUT = 20000;

function byTitle(t) {
  return PRODUCTS.find(p => (p.title || '').toLowerCase() === (t || '').toLowerCase())
    || PRODUCTS.find(p => (p.title || '').toLowerCase().indexOf((t || '').toLowerCase()) > -1);
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

function loadHistory() {
  try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { return {}; }
}

function saveHistory(h) { fs.writeFileSync(HISTORY_FILE, JSON.stringify(h, null, 1), 'utf8'); }

function loadManual() {
  try { return JSON.parse(fs.readFileSync(MANUAL_FILE, 'utf8')); } catch (e) { return []; }
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
        results.push({ product: item, live: parsed });
        console.log(`  ${item.title}: ${parsed.currency}${parsed.price}`);
      } catch (e) {
        console.log(`  ${item.title}: fetch error (${e.message})`);
      }
      await wait(250);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length || 1) }, run));
}

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

async function main() {
  // Build watchlist: products that have an Andertons buy link
  const watchlist = PRODUCTS.filter(p => p.stores && p.stores.andertons).map(p => ({ id: p.id, title: p.title, priceUsd: p.price, img: p.img, andertons: p.stores.andertons }));
  console.log('auto-deals: watchlist =', watchlist.length, 'products');

  const history = loadHistory();
  const results = [];
  await worker(watchlist, history, results);

  // Update price history (baseline = first observed price; track running normal)
  for (const r of results) {
    const key = String(r.product.id);
    const rec = history[key] || { firstSeen: r.live.price, normal: r.live.price, low: r.live.price, lastPrice: r.live.price, lastSeen: new Date().toISOString().slice(0, 10) };
    rec.lastPrice = r.live.price;
    rec.lastSeen = new Date().toISOString().slice(0, 10);
    rec.low = Math.min(rec.low, r.live.price);
    // A price at/above our running normal ends the deal window; below (by >= MIN_DROP_PCT) opens/keeps one
    if (r.live.price >= rec.normal) {
      rec.normal = r.live.price;
    }
    history[key] = rec;
  }
  saveHistory(history);

  // Build active deals from observed price drops
  const autoDeals = [];
  for (const r of results) {
    const key = String(r.product.id);
    const rec = history[key];
    const saving = rec.normal - r.live.price;
    if (saving > 0 && saving / rec.normal >= MIN_DROP_PCT) {
      const prod = byTitle(r.product.title);
      const cur = r.live.currency || 'GBP';
      const sym = cur === 'GBP' ? '£' : (cur === 'EUR' ? '€' : '$');
      autoDeals.push({
        product_id: r.product.id,
        title: r.product.title,
        title_es: (prod && prod.title_es) || r.product.title,
        price: r.live.price,
        old_price: Math.round(rec.normal * 100) / 100,
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

  // Merge manual verified deals
  const manual = loadManual();
  const merged = [];
  const seenId = new Set();
  const seenTitle = new Set();
  for (const d of [...autoDeals, ...manual]) {
    if (d.product_id != null && seenId.has(d.product_id)) continue;
    if (seenTitle.has(d.title)) continue;
    if (d.product_id != null) seenId.add(d.product_id);
    seenTitle.add(d.title);
    merged.push(d);
  }

  fs.writeFileSync(DEALS_FILE, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log('auto-deals: wrote', merged.length, 'deals (auto=' + autoDeals.length + ', manual=' + manual.length + ')');

  try { execSync('node build-deals.js', { cwd: OUT_DIR, stdio: 'inherit' }); } catch (e) { console.log('build-deals failed:', e.message); }
}

main().catch(e => { console.error('auto-deals error:', e); process.exit(1); });