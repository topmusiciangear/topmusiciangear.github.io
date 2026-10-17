const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const set = (id, img) => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log(id + ' no existe'); process.exit(1); }
  p.img = img; p.image = img;
  console.log(id + ' ' + p.title + ' -> ' + img);
};
set(1008, 'https://banners.pluginboutique.com/efszazxwbxiip97tscava5iaz4lk');
set(1007, 'https://banners.pluginboutique.com/msjrldeol87ro2vg58we3uwyvitf');
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nproducts.json guardado');