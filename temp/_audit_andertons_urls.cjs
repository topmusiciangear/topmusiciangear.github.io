const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const bj = fs.readFileSync(path.join(ROOT, 'build-guides.js'), 'utf8');
const m = bj.match(/const TEST_SHOP_BTN = \{([\s\S]*?)\n\s*\};function shopButtonsTest/);
const CFG = new Function('return ({' + m[1] + '});')();

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CONCURRENCY = 6, FETCH_TIMEOUT = 15000, DELAY = 150;
const wait = ms => new Promise(r => setTimeout(r, ms));

function derefAffiliate(url) {
  let u = String(url || '');
  const w = u.match(/[?&]ued=([^&]*)/);
  if (w && w[1]) u = decodeURIComponent(w[1]);
  return u.split('?')[0];
}

function parsePrice(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    try {
      const o = JSON.parse(b[1]);
      if (o && o['@type'] && /Product/i.test(o['@type']) && o.offers) {
        const offer = Array.isArray(o.offers) ? o.offers[0] : o.offers;
        const price = Number(offer && (offer.price !== undefined ? offer.price : offer.highPrice));
        if (isFinite(price) && price > 0) return { price, currency: offer.priceCurrency || 'GBP', title: o.name || '' };
      }
    } catch (e) { /* skip */ }
  }
  return null;
}

const num = s => { if (s == null) return null; const n = Number(String(s).replace(/[,\s]/g, '').replace(/[£$€]/g, '')); return isFinite(n) ? n : null; };

const items = [];
for (const p of PRODUCTS) {
  const cfg = CFG[p.id] || {};
  const price = num((cfg.prices || {})['andertons']);
  const url = p.stores && p.stores['andertons'];
  const oos = (cfg.oos || []).includes('andertons');
  const na = (cfg.na || []).includes('andertons');
  if (!url) continue;
  items.push({ id: p.id, title: p.title, url: derefAffiliate(url), price, oos, na });
}
console.log('Productos con URL andertons:', items.length);

const results = [];
let done = 0;
async function worker() {
  while (items.length) {
    const it = items.shift();
    let status = 0, parsed = null, err = null;
    try {
      const ctrl = AbortSignal.timeout ? AbortSignal.timeout(FETCH_TIMEOUT) : undefined;
      const r = await fetch(it.url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, signal: ctrl });
      status = r.status;
      if (status === 200) {
        const html = await r.text();
        parsed = parsePrice(html);
      }
    } catch (e) { err = e.message; }
    let cls;
    if (status !== 200) cls = 'DEAD_HTTP';
    else if (!parsed) cls = 'NO_PRODUCT';
    else cls = 'OK';
    results.push({ ...it, status, cls, live: parsed, err });
    done++;
    if (done % 40 === 0) console.log('  ...', done, '/', done + items.length, 'items rest', items.length);
    await wait(DELAY);
  }
}
(async () => {
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length || 1) }, worker));
  let ok = 0, dead = [], noprod = [], mismatch = [], other = [];
  for (const r of results) {
    if (r.cls === 'OK') {
      ok++;
      if (r.price != null && r.live && r.live.price > 0) {
        const ratio = Math.max(r.price, r.live.price) / Math.min(r.price, r.live.price);
        if (ratio > 1.3) mismatch.push({ ...r, ratio: +ratio.toFixed(2) });
      }
    } else if (r.cls === 'DEAD_HTTP') dead.push(r);
    else if (r.cls === 'NO_PRODUCT') noprod.push(r);
    else other.push(r);
  }
  console.log('');
  console.log('=== RESUMEN ===');
  console.log('OK:', ok, '| DEAD_HTTP:', dead.length, '| NO_PRODUCT:', noprod.length, '| mismatch(>30%):', mismatch.length);
  console.log('');
  console.log('=== DEAD_HTTP (URL muerta, producto NO existe en Andertons) ===', dead.length);
  for (const r of dead) console.log(`  ${r.id}\t${r.status}\t${r.title}\t${r.price != null ? '£' + r.price : 'sin-precio'}\t${r.url}`);
  console.log('');
  console.log('=== NO_PRODUCT (200 pero sin JSON-LD Producto = redirect/página sin producto) ===', noprod.length);
  for (const r of noprod) console.log(`  ${r.id}\t${r.title}\t${r.price != null ? '£' + r.price : 'sin-precio'}\t${r.url}`);
  console.log('');
  console.log('=== MISMATCH precio TEST_SHOP_BTN vs Andertons LIVE (>30%) ===', mismatch.length);
  for (const r of mismatch) console.log(`  ${r.id}\t£${r.price}\tvs £${r.live.price} (x${r.ratio})\t${r.title}\t${r.url}`);
  fs.writeFileSync(path.join(__dirname, '_results_andertons.json'), JSON.stringify(results, null, 1), 'utf8');
  console.log('');
  console.log('saved temp/_results_andertons.json');
})().catch(e => { console.error('FATAL', e); process.exit(1); });