const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  183: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  183: {
    prices: {
      amazon: "$3,199.00",
      zzounds: "$3,199.00",
      andertons: "£2,434.00",
      gear4music: "£2,213.00",
      musicstore: "€2,899.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '183': { 'prices.andertons': ['£2,035.00', '£2,434.00'], 'prices.musicstore': ['€1,797.48', '€2,899.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync(VF, v);
console.log('done');