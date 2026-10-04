const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const start = src.indexOf('  264: {');
let d = 0, q = null, i = start;
for (; i < src.length; i++) {
  const c = src[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN264: ' + src.slice(start, i + 1).replace(/\s+/g, ' '));
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const p = P.find(x => x.id === 264);
console.log('catalog 264 price:', p.price, '| stores:', Object.keys(p.stores || {}).join(','));