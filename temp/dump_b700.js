const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
['best-bass-under-700', 'budget-bass-like-expensive'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log('===== ' + id + ' | ' + g.title);
  console.log('featured: ' + JSON.stringify(g.featuredProducts));
  const solo = (g.sections || []).filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('reviews de 1 producto: ' + JSON.stringify(solo));
  console.log('sin review: ' + JSON.stringify([].concat(g.featuredProducts).filter(x => !solo.includes(x))));
  console.log('tabla cols: ' + g.productTable.columns.map(c => c.title).join(' | '));
  (g.sections || []).forEach((s, i) => console.log('  [' + i + '] ' + (s.heading || s.h || '?') + ' | ' + JSON.stringify(s.products)));
  console.log('verdictProsCons: ' + g.verdictProsCons.map(v => v.name).join(' | '));
  console.log('');
});
const p = arr.find(x => x.id === 467);
console.log('=== producto 467 ===');
console.log(JSON.stringify(p, null, 1));