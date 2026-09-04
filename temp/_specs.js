const path = require('path');
const products = require(path.join(__dirname, '..', 'data', 'products.json'));
[103, 310, 313, 309, 295, 463, 464, 462].forEach(id => {
  const p = products.find(v => v.id === id);
  if (!p) { console.log(id, 'NOT FOUND'); return; }
  console.log('### ' + id + ' — ' + p.title);
  console.log('  price:', p.price);
  console.log('  desc:', p.desc);
  console.log('');
});