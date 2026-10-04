const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
[243, 261].forEach(id => {
  const start = src.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BTN' + id + ': ' + src.slice(start, i + 1).replace(/\s+/g, ' '));
});
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[243, 261].forEach(id => {
  const p = P.find(x => x.id === id);
  console.log('catalog ' + id + ' price:', p.price);
});