const p = require('../data/products.json');
[102,68,295,124,103,444,65,313].forEach(id => {
  const x = p.find(v => v.id === id);
  console.log(id, x ? x.title : 'NOT FOUND', '| price', x ? x.price : '');
});
console.log('---search for candidates---');
const pat = /squier|epiphone les paul|yamaha c40|cordoba|c40|affinity/i;
p.forEach(x => { if (pat.test(x.title) && x.category === 'guitars') console.log(x.id, x.title, '|', x.price); });
