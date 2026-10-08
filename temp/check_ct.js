const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = require(DIR + 'data/products.json').find(y => y.id === 129);
console.log('stores:', JSON.stringify(p.stores, null, 1));
const src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const i = src.indexOf('129:');
console.log('TEST129:', src.slice(i, i + 400).replace(/\n/g, ' '));
