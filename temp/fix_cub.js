const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  114: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const block = t.slice(start, i + 1);
const nu = block
  .split('gear4music: "£299.00"').join('gear4music: "£479.00"')
  .split('andertons: "£299.00"').join('andertons: "£479.00"')
  .split('musicstore: "€339.00"').join('musicstore: "€569.00"');
t = t.slice(0, start) + nu + t.slice(i + 1);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '114': { 'prices.gear4music': ['£299.00', '£479.00'], 'prices.andertons': ['£299.00', '£479.00'], 'prices.musicstore': ['€339.00', '€569.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');