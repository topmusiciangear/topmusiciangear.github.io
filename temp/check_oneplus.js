const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-drum-machine');
console.log('feat:', JSON.stringify(d.featuredProducts));
console.log('cols:', d.productTable.columns.map(c => c.title));
const ci = d.productTable.columns.findIndex(c => /One/.test(c.title));
console.log('One+ col idx:', ci);
d.productTable.rows.forEach(r => console.log(' -', r.label, '=>', JSON.stringify(r.values[ci])));
console.log('vpc One+:', JSON.stringify(d.verdictProsCons.find(v => /One/.test(v.name)), null, 1).slice(0, 900));
d.sections.forEach((s, i) => { if ((s.products || []).includes(611)) console.log('sec', i, s.heading); });
const s = JSON.stringify(d);
['One\\+', 'One Plus'].forEach(n => {
  let i = -1, k = 0;
  const re = new RegExp(n, 'g');
  let m;
  while ((m = re.exec(s)) !== null && k < 8) { console.log('HIT', n, ':', s.slice(Math.max(0, m.index - 80), m.index + 60).replace(/\n/g, ' ')); k++; }
});
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const g2 = p.find(y => y.id === 256);
console.log('256:', g2.title, '| price:', g2.price, '| img:', (g2.img || '').slice(0, 60));
