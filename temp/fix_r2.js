const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  248: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  248: {
    prices: {
      amazon: "$529.00",
      zzounds: "$595.00",
      andertons: "£519.00",
      gear4music: "£519.00",
      musicstore: "€635.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '248': { 'prices.andertons': ['£523.00', '£519.00'], 'prices.gear4music': ['£523.00', '£519.00'], 'prices.musicstore': ['€533.61', '€635.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');