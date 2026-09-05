const fs = require('fs');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = [53, 93, 170, 187, 326, 414, 415, 416, 417, 418];
const byId = {};
for (const p of prods) byId[p.id] = p;
for (const id of ids) {
  const p = byId[id];
  if (!p) { console.log('id', id, '=> NOT FOUND'); continue; }
  console.log('--- id', id, '| name:', p.name);
  console.log('    brand:', p.brand, '| rating:', p.rating, '| reviews:', p.reviews);
  console.log('    price:', JSON.stringify(p.price), '| currency:', p.currency);
  const stores = p.stores || {};
  for (const k of Object.keys(stores)) console.log('    store', k, '=>', stores[k].slice(0, 140));
}