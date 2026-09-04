const path = require('path');
const products = require(path.join(__dirname, '..', 'data', 'products.json'));
const guides = require(path.join(__dirname, '..', 'data', 'guides.json'));

const ids = [103, 310, 462, 313, 295, 309, 463, 464, 65, 124, 444];
ids.forEach(id => {
  const p = products.find(v => v.id === id);
  if (!p) { console.log(id, 'NOT FOUND'); return; }
  const zz = (p.stores && p.stores.zzounds) ? 'zz' : '';
  const g4m = (p.stores && p.stores.gear4music) ? 'g4m' : '';
  const am = (p.stores && p.stores.amazon) ? 'amz' : '';
  console.log(id, '|', p.price, '|', p.title, '|', [zz, g4m, am].filter(Boolean).join(','));
});

console.log('\n--- Guides with "pro truth" that might cover 700+ electric guitars ---');
const electricGuides = guides.filter(g => {
  const j = JSON.stringify(g);
  return /electric|guitar/i.test(j) && /guitar/i.test(g.title);
});
electricGuides.forEach(g => console.log('-', g.id, '|', g.title));