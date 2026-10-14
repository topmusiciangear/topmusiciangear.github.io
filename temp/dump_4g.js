const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[647, 648, 649, 650, 651, 95, 91, 92, 107, 56, 25, 24, 23].forEach(id => {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log('=== ' + id + ' FALTA'); return; }
  console.log('=== ' + id + ' | ' + p.title + ' | $' + p.price);
  console.log('  ' + p.desc);
});
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('\n--- TEST ---');
[647, 648, 649, 650, 651, 95, 91, 92, 107, 56, 25, 24, 23].forEach(id => {
  const m = new RegExp('\\n  ' + id + ': \\{[\\s\\S]{0,380}?\\n  \\},').exec(src);
  console.log(id + ': ' + (m ? m[0].replace(/\s+/g, ' ').slice(0, 190) : 'SIN BLOQUE'));
});
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['fender-guide', 'monitor-setup', 'stage-wireless', 'best-headphones-for-mixing'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const solo = (g.sections || []).filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('\n### ' + id + ' | reviews ' + solo.length + ' | verdicts ' + g.verdictProsCons.length);
  console.log('  reviews: ' + JSON.stringify(solo));
  console.log('  featured: ' + JSON.stringify(g.featuredProducts));
});