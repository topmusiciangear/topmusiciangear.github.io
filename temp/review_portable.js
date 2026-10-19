const g = require('../data/guides.json');
const p = require('../data/products.json');
const guide = g.find(x => x.id === 'portable-interfaces');
const ids = [17, 15, 328, 18, 55, 262, 263, 54, 53];

console.log('=== PRODUCTOS EN LA GUÍA ===\n');
ids.forEach(id => {
  const prod = p.find(x => x.id === id);
  if (!prod) { console.log(id, ': NOT FOUND'); return; }
  console.log(`--- ${prod.title} (id ${id}) ---`);
  console.log('  Brand:', prod.brand, '| Price: $' + prod.price, '| Category:', prod.category);
  console.log('  Desc:', (prod.desc || '').substring(0, 150));
  console.log('  Pros:', (prod.pros || []).slice(0, 3).join('; '));
  console.log('  Cons:', (prod.cons || []).slice(0, 3).join('; '));
  console.log('');
});

console.log('\n=== VERDICT ACTUAL ===');
console.log(guide.verdict);
console.log('\n=== CONCLUSION ACTUAL ===');
console.log(guide.conclusion);
