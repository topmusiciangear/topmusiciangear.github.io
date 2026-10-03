const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 333).stores.zzounds = 'https://www.zzounds.com/item--AAHZEDI10FX?siid=182825';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  333: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('CURRENT 333: ' + t.slice(start, i + 1).replace(/\s+/g, ' '));