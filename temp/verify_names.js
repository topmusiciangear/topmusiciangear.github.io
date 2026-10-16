const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h1 = fs.readFileSync(B + 'guides/mixing-plugins.html', 'utf8');
const h2 = fs.readFileSync(B + 'guides/vocal-plugins.html', 'utf8');
// verdict names present?
console.log('mixing verdict names:');
[...h1.matchAll(/verdict-product-name">([^<]*)/g)].forEach(m => console.log('  [' + m[1] + ']'));
console.log('vocal verdict names:');
[...h2.matchAll(/verdict-product-name">([^<]*)/g)].forEach(m => console.log('  [' + m[1] + ']'));
console.log('mixing card titles:');
[...h1.matchAll(/guide-product-card-title">([^<]*)/g)].forEach(m => console.log('  [' + m[1] + ']'));
console.log('vocal card titles:');
[...h2.matchAll(/guide-product-card-title">([^<]*)/g)].forEach(m => console.log('  [' + m[1] + ']'));
