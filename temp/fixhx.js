const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  202: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  202: {
    prices: {
      amazon: "$599.99",
      zzounds: "$599.99",
      andertons: "£499.00",
      gear4music: "£526.00",
      musicstore: "€599.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
let v = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
v = v.split(anchor).join("  '202': { 'prices.andertons': ['£479.00', '£499.00'], 'prices.gear4music': ['£549.00', '£526.00'], 'prices.musicstore': ['€649.00', '€599.00'] },\n" + anchor);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', v);
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const p = P.find(x => x.id === 205);
console.log('IMG205: ' + p.img);