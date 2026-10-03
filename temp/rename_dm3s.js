const fs = require('fs');
// 1. catalog 411
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 411);
p.title = 'Yamaha DM3S';
p.title_es = 'Yamaha DM3S';
p.price = 1699.99;
p.rating = 4.5; p.reviews = 59;
p.stores.zzounds = 'https://www.zzounds.com/item--YAMDM3S?siid=334208';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// 2. BTN 411
function replaceEntry(t, id, nu) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return t.slice(0, start) + nu + t.slice(i + 2);
}
let t = fs.readFileSync('build-guides.js', 'utf8');
t = replaceEntry(t, 411, `  411: { prices: { amazon: "$1,799.99", zzounds: "$1,866.00", andertons: "£1,399.00", musicstore: "€1,427.70" } },`);
fs.writeFileSync('build-guides.js', t);
// 3. whitelist
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '411': { 'prices.zzounds': [undefined, '$1,866.00'], 'prices.amazon': ['$1,699.99', '$1,799.99'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
// 4. guide rename
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gi = G.findIndex(x => x.id === 'best-digital-mixers');
let s = JSON.stringify(G[gi]);
console.log('DM3 Standard hits:', s.split('DM3 Standard').length - 1);
s = s.split('DM3 Standard').join('DM3S');
G[gi] = JSON.parse(s);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('done');