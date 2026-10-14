const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[6, 309, 310, 313, 124, 444, 440, 126, 330, 278, 50, 197, 297, 196].forEach(id => {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log('=== ' + id + ' FALTA'); return; }
  console.log('=== ' + id + ' | ' + p.title + ' | $' + p.price + ' | ' + p.category);
  console.log('  EN: ' + p.desc);
});
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-electric-guitar', 'budget-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const solo = (g.sections || []).filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('\n### ' + id);
  console.log('featured: ' + JSON.stringify(g.featuredProducts));
  console.log('reviews: ' + JSON.stringify(solo));
  console.log('sin review: ' + JSON.stringify(g.featuredProducts.filter(i => !solo.includes(i))));
  console.log('verdicts: ' + g.verdictProsCons.map(v => v.name).join(' | '));
  console.log('seccionesOverview: ' + (g.sections || []).filter(s => (s.products || []).length > 1).map(s => s.heading).join(' | '));
  const miss = g.featuredProducts.filter(i => !solo.includes(i));
  console.log('faltan verdicts para: ' + miss.map(i => { const p = arr.find(x => x.id === i); return i + ' ' + (p ? p.title : '?'); }).join(' | '));
});