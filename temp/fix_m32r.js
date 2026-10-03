const fs = require('fs');
// 1. Catalog 412: add G4M + zzounds
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 412);
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FMidas-M32R-LIVE-Digital-Mixing-Console%2F3R06';
p.stores.zzounds = 'https://www.zzounds.com/item--MIDM32RLIVE';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// 2. TEST_SHOP_BTN 412
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  412: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  412: {
    prices: {
      amazon: "$2,499.00",
      andertons: "£1,614.00",
      musicstore: "€2,099.00",
      gear4music: "£2,106.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
// 3. Whitelist
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '412': { 'prices.gear4music': [undefined, '£2,106.00'], 'prices.musicstore': ['€1,678.99', '€2,099.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');