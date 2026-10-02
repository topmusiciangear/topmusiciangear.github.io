const fs = require('fs');
let t = fs.readFileSync('data/products.json', 'utf8');
const idx = t.indexOf('"id": 479');
const storesIdx = t.indexOf('"stores":', idx);
let d = 0, q = null, i = storesIdx;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log(t.slice(storesIdx, i + 1));