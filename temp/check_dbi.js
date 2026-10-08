const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = require(DIR + 'data/products.json').find(y => y.id === 614);
console.log('img:', p.img);
console.log('stores:', JSON.stringify(p.stores, null, 1));
const src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const i = src.indexOf('614:');
console.log('TEST614:', src.slice(i, i + 500).replace(/\n/g, ' '));
