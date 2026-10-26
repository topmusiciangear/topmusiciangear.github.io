const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
const products=require('./js/products.js')? null : null;
// find products.json? check js/products.js
console.log('featuredProducts:', gu.featuredProducts);
// search product names in guides? Instead inspect products.js existence
const pfs='C:/Users/Daniel/projects/topmusiciangear/js/products.js';
console.log('products.js exists:', fs.existsSync(pfs));