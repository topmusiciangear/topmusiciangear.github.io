const fs = require('fs');
const P = require('../data/products.json');
[402, 403].forEach(id => {
  const p = P.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title + ' $' + p.price + ' img=' + p.img);
  console.log('stores: ' + JSON.stringify(p.stores));
});
const t = fs.readFileSync('build-guides.js', 'utf8');
[402, 403].forEach(id => {
  const i = t.indexOf('  ' + id + ': {');
  if (i === -1) { console.log('BTN ' + id + ': NO ENTRY'); return; }
  let d = 0, q = null, j = i;
  for (; j < t.length; j++) {
    const c = t[j];
    if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BTN ' + id + ': ' + t.slice(i, j + 1).replace(/\s+/g, ' '));
});