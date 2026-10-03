const P = require('../data/products.json');
[148, 412].forEach(id => {
  const p = P.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title + ' $' + p.price);
  console.log('desc: ' + (p.desc || '').slice(0, 200));
  console.log('stores: ' + JSON.stringify(p.stores, null, 1));
});