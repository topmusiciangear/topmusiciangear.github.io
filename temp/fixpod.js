const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  259: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  259: {
    prices: {
      gear4music: "£399.00",
      amazon: "$499.99",
      zzounds: "$599.99",
      andertons: "£399.00",
      musicstore: "€498.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
let v = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
v = v.split(anchor).join("  '259': { 'prices.gear4music': ['£414.00', '£399.00'], 'prices.musicstore': ['€503.36', '€498.00'] },\n" + anchor);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', v);
console.log('POD written');