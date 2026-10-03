const fs = require('fs');
// 1. Catalog image 262
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 262).img = 'https://r2.gear4music.com/media/60/609791/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// 2. TEST_SHOP_BTN prices 262
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  262: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  262: {
    prices: {
      amazon: "$129.99",
      zzounds: "$179.00",
      andertons: "£91.00",
      gear4music: "£94.00",
      musicstore: "€115.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
// 3. Whitelist
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '262': { 'prices.zzounds': ['$129.99', '$179.00'], 'prices.gear4music': ['£93.10', '£94.00'], 'prices.musicstore': ['€167.23', '€115.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');