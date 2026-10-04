const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
console.log('existe:', G.some(g => /p-225.*fp-30x|fp-30x.*p-225/i.test(g.id + ' ' + g.title)));
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
['Yamaha P-225', 'Roland FP-30X'].forEach(s => {
  const p = P.find(x => x.title === s);
  if (!p) { console.log(s, '=> SIN CATALOGO'); return; }
  console.log(s, '=> id ' + p.id + ' | price ' + p.price + ' | rating ' + p.rating);
});
const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
[0, 0].forEach(() => {});
const Pids = [0];
const ids = [];
P.forEach(p => { if (p.title === 'Yamaha P-225' || p.title === 'Roland FP-30X') ids.push(p.id); });
ids.forEach(id => {
  const start = t.indexOf('  ' + id + ': {');
  if (start < 0) { console.log('BTN' + id + ': SIN ENTRADA'); return; }
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BTN' + id + ': ' + t.slice(start, i + 1).replace(/\s+/g, ' '));
});