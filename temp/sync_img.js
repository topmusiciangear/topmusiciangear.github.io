const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
[1013, 1014, 1015].forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) return console.log(id + ' no existe');
  p.img = p.image;           // las cards usan p.img
  console.log(id + ' ' + p.title + ' -> img=' + p.img);
});
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nproducts.json guardado');