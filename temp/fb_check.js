const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/ozone-vs-fabfilter.html', 'utf8');
const body = h.slice(h.indexOf('<body'));
const i = body.indexOf('guide-product-card-title');
console.log(JSON.stringify(body.slice(i, i + 120)));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
console.log('titulo en catalogo: ' + products.find(x => x.id === 1033).title);
