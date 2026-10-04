const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  264: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
let block = t.slice(start, i + 1);
if (!block.includes('gear4music: "£229.99"')) { console.log('G4M PATTERN MISSING'); process.exit(1); }
block = block.split('gear4music: "£229.99"').join('gear4music: "£329.99"');
t = t.slice(0, start) + block + t.slice(i + 1);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '264-g4m': { 'prices.gear4music': ['£229.99', '£329.99'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync(VF, v);
console.log('BTN264 G4M fixed + whitelisted');