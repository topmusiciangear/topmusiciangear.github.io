const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

// gear4music-deals.js
// Scrapes real Gear4Music product pages (JSON-LD) for the 195 products that
// carry a gear4music buy link in data/products.json. Gear4Music is fronted by
// Cloudflare which returns 403 to Node's fetch() and PowerShell, but allows
// curl with a full Chrome User-Agent. So this script drives the system curl
// binary through child_process.execFile.
//
// Deal detection is hybrid:
//   1. Visible discount: if the page marks the product "on offer" and exposes
//      a strike-through price, we use it immediately (old_price = was).
//   2. Silent drop: otherwise we track a per-product normal price in
//      data/g4m-price-history.json and open a deal when the live price drops
//      >=5% below normal (same mechanism as auto-deals.js for Andertons).
//
// Deals are written into data/manual-deals.json (source: "gear4music") and
// merged with the telegram deals on every auto-deals run. auto-deals.js is
// responsible for the final dedup and the deals page build.

const OUT_DIR = __dirname;
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'products.json'), 'utf8'));
const MANUAL_FILE = path.join(OUT_DIR, 'data', 'manual-deals.json');
const HISTORY_FILE = path.join(OUT_DIR, 'data', 'g4m-price-history.json');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const MIN_DROP_PCT = 0.05;   // need >=5% observed drop to call it a deal
const CONCURRENCY = 1;       // sequential: Cloudflare rate-limits parallel bursts
const DELAY_MS = 1000;       // be polite to Cloudflare; keeps rate-limit challenges away
const MAX_ATTEMPTS = 3;
const FETCH_TIMEOUT = 25000;
const LIMIT = process.env.G4M_LIMIT ? Number(process.env.G4M_LIMIT) : Infinity; // test hook

function curlFetch(url) {
  return new Promise((resolve, reject) => {
    execFile('curl', [
      '-s', '-L', '--max-time', String(FETCH_TIMEOUT), '--connect-timeout', '10',
      '-A', UA,
      '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      '-H', 'Accept-Language: en-GB,en;q=0.9',
      '-H', 'Upgrade-Insecure-Requests: 1',
      '--compressed',
      url
    ], { maxBuffer: 10 * 1024 * 1024, windowsHide: true }, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

function isChallenge(html) {
  return /Just a moment|challenge-platform|cf-browser|Attention Required/.test(html);
}

// now price from the product JSON-LD Offer block. Only the page's own Product
// node is trusted: Gear4Music category pages carry other products' prices, so
// any non-JSON-LD fallback would read the wrong item.
function parseNow(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    try {
      const o = JSON.parse(b[1]);
      if (o && o['@graph']) {
        for (const node of o['@graph']) {
          if (node && node['@type'] === 'Product' && node.offers) {
            const offer = Array.isArray(node.offers) ? node.offers[0] : node.offers;
            const price = Number(offer && offer.price);
            if (isFinite(price) && price > 0) {
              return { price, currency: (offer && offer.priceCurrency) || 'GBP' };
            }
          }
        }
      }
      if (o && o['@type'] === 'Product' && o.offers) {
        const offer = Array.isArray(o.offers) ? o.offers[0] : o.offers;
        const price = Number(offer && offer.price);
        if (isFinite(price) && price > 0) {
          return { price, currency: (offer && offer.priceCurrency) || 'GBP' };
        }
      }
    } catch (e) { /* skip malformed block */ }
  }
  return null;
}

// strike-through (was) price when the store marks the product on offer
function parseWas(html) {
  const m = html.match(/"str_strike_through_price":"([^"]*)"/);
  if (!m || !m[1]) return null;
  const v = m[1].replace(/\\\//g, '/');
  const n = v.match(/c-val[^>]*>\s*([\d.,]+)/);
  if (!n) return null;
  const num = Number(n[1].replace(/,/g, ''));
  return isFinite(num) && num > 0 ? num : null;
}

function isOnOffer(html) {
  return /"is_on_offer":true/.test(html);
}

function loadHistory() {
  try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { return {}; }
}

function saveHistory(h) { fs.writeFileSync(HISTORY_FILE, JSON.stringify(h, null, 1), 'utf8'); }

function loadManual() {
  try { return JSON.parse(fs.readFileSync(MANUAL_FILE, 'utf8')); } catch (e) { return []; }
}

async function fetchPage(url) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const html = await curlFetch(url);
      if (!isChallenge(html) && html.length > 5000 && /Product/.test(html)) return html;
    } catch (e) { /* fall through to retry */ }
    await wait(800 * attempt); // backoff before retry
  }
  return null;
}

async function worker(items, history) {
  const queue = [...items];
  const out = [];
  const run = async () => {
    while (queue.length) {
      const item = queue.shift();
      const html = await fetchPage(item.gear4music);
      if (!html) {
        console.log(`  ${item.title}: blocked/unreachable (skipped)`);
        await wait(DELAY_MS);
        continue;
      }
      const nowP = parseNow(html);
      if (!nowP) {
        console.log(`  ${item.title}: no price found`);
        await wait(DELAY_MS);
        continue;
      }
      const key = 'g4m_' + item.id;
      const symNow = nowP.currency === 'EUR' ? '€' : (nowP.currency === 'USD' ? '$' : '£');
      console.log(`  ${item.title}: ${symNow}${nowP.price}${isOnOffer(html) ? ' (on offer)' : ''}`);      const rec = history[key] || { firstSeen: nowP.price, normal: nowP.price, low: nowP.price, lastPrice: nowP.price, lastSeen: new Date().toISOString().slice(0, 10) };
      rec.lastPrice = nowP.price;
      rec.lastSeen = new Date().toISOString().slice(0, 10);
      rec.low = Math.min(rec.low, nowP.price);
      if (nowP.price >= rec.normal) rec.normal = nowP.price;
      history[key] = rec;

      const was = isOnOffer(html) ? parseWas(html) : null;
      const saving = was != null ? was - nowP.price : rec.normal - nowP.price;
      if (saving > 0 && saving / (was != null ? was : rec.normal) >= MIN_DROP_PCT) {
        const prod = byTitle(item.title);
        const oldPrice = was != null ? was : Math.round(rec.normal * 100) / 100;
        const sym = nowP.currency === 'EUR' ? '€' : (nowP.currency === 'USD' ? '$' : '£');
        out.push({
          product_id: item.id,
          title: item.title,
          title_es: (prod && prod.title_es) || item.title,
          price: nowP.price,
          old_price: oldPrice,
          currency: sym,
          store: 'gear4music',
          store_url: item.gear4music,
          img: item.img,
          badge_en: `Save ${sym}${saving.toFixed(saving % 1 ? 1 : 0)}`,
          badge_es: `Ahorra ${sym}${saving.toFixed(saving % 1 ? 1 : 0)}`,
          desc: (prod && prod.desc) || item.title,
          desc_es: (prod && prod.desc_es) || (prod && prod.title_es) || item.title,
          date_added: rec.lastSeen,
          source: 'gear4music'
        });
        console.log(`  ${item.title}: ${sym}${oldPrice} -> ${sym}${nowP.price} (${was != null ? 'visible' : 'history'})`);
      }
      await wait(DELAY_MS);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length || 1) }, run));
  return out;
}

function byTitle(t) {
  return PRODUCTS.find(p => (p.title || '').toLowerCase() === (t || '').toLowerCase())
    || PRODUCTS.find(p => (p.title || '').toLowerCase().indexOf((t || '').toLowerCase()) > -1);
}

async function main() {
  const watchlist = PRODUCTS
    .filter(p => p.stores && p.stores.gear4music)
    .map(p => ({ id: p.id, title: p.title, img: p.img, gear4music: p.stores.gear4music }));
  console.log('gear4music-deals: watchlist =', watchlist.length, 'products');

  const limited = watchlist.slice(0, LIMIT);
  const history = loadHistory();
  const g4mDeals = await worker(limited, history);
  saveHistory(history);

  // Merge into manual-deals.json without losing the telegram deals.
  // Replace any previous gear4music entries with the freshly computed set.
  const existing = loadManual().filter(d => d.source !== 'gear4music');
  const manual = [...existing, ...g4mDeals];
  fs.writeFileSync(MANUAL_FILE, JSON.stringify(manual, null, 2) + '\n', 'utf8');
  console.log('gear4music-deals: wrote', g4mDeals.length, 'gear4music deals (manual total =', manual.length + ')');
}

main().catch(e => { console.error('gear4music-deals error:', e); process.exit(1); });
