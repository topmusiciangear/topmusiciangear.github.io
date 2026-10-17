const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1017);
p.img = 'https://banners.pluginboutique.com/oq40l98skd6uogdulc20z92udwkh';
p.image = p.img;
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1017 img=' + p.img + ' | image=' + p.image);