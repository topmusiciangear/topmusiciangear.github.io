const fs = require('fs');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('keys of a product:', Object.keys(prods[0]).join(', '));
const byId = {};
for (const p of prods) byId[p.id] = p;
for (const id of [53, 187]) {
  const p = byId[id];
  const u = p.stores && p.stores.musicstore;
  console.log('id', id, 'musicstore full URL:', u);
}
console.log('id 53 title:', byId[53].title || byId[53].name);
console.log('id 170 title:', (byId[170] && (byId[170].title || byId[170].name)));
console.log('id 170 all:', JSON.stringify(byId[170]).slice(0, 300));