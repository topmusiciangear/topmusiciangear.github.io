const p = require('../data/products.json');
[310].forEach(id => {
  const x = p.find(v => v.id === id);
  console.log(JSON.stringify(x, null, 2));
});
