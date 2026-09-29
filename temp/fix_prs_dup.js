const fs = require('fs');
const p = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const gu = g.find(x => x.id === 'best-electric-guitars-2026');
if (!gu) throw new Error('guide not found');

let changes = 0;
gu.sections.forEach(s => {
  if (!Array.isArray(s.products)) return;
  const before = s.products.length;
  s.products = s.products.filter(id => id !== 320);
  if (s.products.length !== before) { changes++; console.log('section "' + (s.heading || '').slice(0, 45) + '": ' + before + ' -> ' + s.products.length + ' products'); }
});
if (Array.isArray(gu.featuredProducts)) {
  const before = gu.featuredProducts.length;
  gu.featuredProducts = gu.featuredProducts.filter(id => id !== 320);
  if (gu.featuredProducts.length !== before) { changes++; console.log('featuredProducts: ' + before + ' -> ' + gu.featuredProducts.length); }
}
if (!changes) { console.log('nothing to do'); process.exit(0); }

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('written. id 320 remaining refs in guide:', (JSON.stringify(gu).match(/\b320\b/g) || []).length);
