const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const prod = d.find(x => x.id === 9010);
prod.img = 'img/products/e1c0b12f0a.webp';
fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('done');
