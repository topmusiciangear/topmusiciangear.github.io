const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const p = products.find(x => x.id === 671);
console.log('Product stores:', JSON.stringify(p.stores, null, 2));
console.log('Product excludeStores:', p.excludeStores);
console.log('Product oos:', p.oos);

// Also check the build-guides.js getResolvedStores function
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
let i = src.indexOf('function getResolvedStores');
if (i > -1) {
  const j = src.indexOf('function ', i + 10);
  console.log('getResolvedStores:', src.slice(i, j));
}