const p = require('../data/products.json');
for (const i of [53, 326, 445, 414, 92, 93]) {
  const x = p.find(y => y.id === i);
  console.log('== id', i, x ? JSON.stringify(x).slice(0, 800) : 'MISSING');
}