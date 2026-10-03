const P = require('../data/products.json');
[270, 272, 273, 274, 275, 295, 296, 414, 418, 163, 514, 516, 527, 542].forEach(id => {
  const p = P.find(x => x.id === id);
  if (!p) { console.log(id, 'MISSING PRODUCT'); return; }
  console.log(id, '|', p.title, '| price', p.price);
  console.log('   stores:', JSON.stringify(p.stores));
});