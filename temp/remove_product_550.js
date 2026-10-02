const fs = require('fs');
let t = fs.readFileSync('data/products.json', 'utf8');
const idx = t.indexOf('"id": 550');
let d = 0, q = null, i = idx;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const prev = t.lastIndexOf('}', idx - 1);
t = t.slice(0, prev + 2) + '\n]';
fs.writeFileSync('data/products.json', t);
console.log('Product 550 removed');