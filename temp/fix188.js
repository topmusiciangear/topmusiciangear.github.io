const fs = require('fs');
const PF = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(PF);
P.find(x => x.id === 188).stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/AKAI-Professional-MPC-Live-III/art-SYN0009363-000';
fs.writeFileSync(PF, JSON.stringify(P, null, 2));
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  188: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  188: {
    prices: {
      amazon: "$1,699.00",
      zzounds: "$1,699.00",
      andertons: "£1,399.00",
      gear4music: "£1,399.00",
      musicstore: "€1,599.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/AKAI-Professional-MPC-Live-III/art-SYN0009363-000"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '188': { 'prices.musicstore': ['€1,129.16', '€1,599.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', v);
console.log('done');