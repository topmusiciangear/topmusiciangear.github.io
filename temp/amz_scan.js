const fs = require('fs');

const FILES = ['data/products.json', 'data/guides.json', 'build-guides.js', 'index.html', 'js/app.js', 'js/app.min.js', 'deals.html', 'deals_es.html', 'js/shop-buttons.js'];
const ASIN_CAPTURE = /\/(?:dp|gp\/product|gp\/aw\/d|product)\/([A-Z0-9]{10})/;   // NO /g -> returns capture
const ASIN_SCAN = /\b([A-Z0-9]{10})\b/g;

const stripQ = u => u.split('?')[0];
const hits = [];
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const txt = fs.readFileSync(f, 'utf8');
  const urlRe = /https?:\/\/(?:www\.)?amazon\.[a-z.]+\/[^"'\s)<>\\]+/g;
  let m;
  while ((m = urlRe.exec(txt))) {
    const raw = m[0];
    const mm = ASIN_CAPTURE.exec(raw);
    hits.push({ file: f, raw, asin: mm ? mm[1] : null, isSearch: /amazon\.[a-z.]+\/s\?k=/.test(raw) });
  }
}

const byFile = {};
hits.forEach(h => { byFile[h.file] = (byFile[h.file] || 0) + 1; });
console.log('=== AMAZON URLS BY FILE ===');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
console.log('  total raw occurrences: ' + hits.length);

const noAsin = hits.filter(h => !h.asin);
console.log('\n=== URLs WITHOUT A CLEAN /dp/ASIN (' + noAsin.length + ') ===');
const seen = new Set();
noAsin.forEach(h => { if (seen.has(h.raw)) return; seen.add(h.raw); console.log('  ' + h.file.padEnd(20) + h.raw.slice(0, 120)); });

const nonCom = hits.filter(h => !/amazon\.com\b/.test(h.raw));
console.log('\n=== NON amazon.com HOSTS (' + nonCom.length + ' occurrences) ===');
const seen2 = new Set();
nonCom.forEach(h => { if (seen2.has(h.raw)) return; seen2.add(h.raw); console.log('  ' + h.file.padEnd(20) + h.raw.slice(0, 120)); });

// junk params
const junk = hits.filter(h => /(\?|&)(lv|channelId|plpRedirect|th|ref|sr|psc|qid|tag|ar_)/.test(h.raw));
console.log('\n=== URLs WITH QUERY PARAMS (' + junk.length + ' occurrences, ' + new Set(junk.map(h => h.raw)).size + ' unique) ===');
const seen3 = new Set();
junk.forEach(h => {
  if (seen3.has(h.raw)) return; seen3.add(h.raw);
  const q = h.raw.split('?')[1] || '';
  console.log('  ' + h.file.padEnd(20) + h.asin + '  ?' + q.slice(0, 95));
});

// slug-prefixed /dp/ (clean but non-canonical)
const slugged = hits.filter(h => h.asin && /amazon\.[a-z.]+\/[^/]+\/dp\//.test(h.raw));
console.log('\n=== SLUG-PREFIXED /dp/ URLS (' + new Set(slugged.map(h => h.raw)).size + ' unique) ===');
new Set(slugged.map(h => h.raw)).forEach(u => console.log('  ' + u.slice(0, 130)));

// trailing slash before query
const trail = hits.filter(h => /\/\?(tag|ar_)/.test(h.raw));
console.log('\n=== TRAILING SLASH BEFORE QUERY (' + trail.length + ') ===');
trail.forEach(h => console.log('  ' + h.file.padEnd(20) + h.raw.slice(0, 120)));

// duplicates across products
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const asinMap = {};
products.forEach(p => {
  const u = p.stores && p.stores.amazon;
  if (!u) return;
  const a = (ASIN_CAPTURE.exec(u) || [])[1];
  if (!a) return;
  (asinMap[a] = asinMap[a] || []).push(p);
});
const dups = Object.entries(asinMap).filter(([, v]) => v.length > 1);
console.log('\n=== SAME ASIN SHARED BY MULTIPLE PRODUCTS (' + dups.length + ') ===');
dups.forEach(([a, v]) => console.log('  ' + a + ' -> ' + v.map(p => '#' + p.id + ' ' + p.title).join('  |  ')));
console.log('\nproducts with amazon: ' + products.filter(p => p.stores && p.stores.amazon).length);
console.log('unique ASINs: ' + Object.keys(asinMap).length);
fs.writeFileSync('temp/amz_asin_map.json', JSON.stringify(asinMap, null, 1));
