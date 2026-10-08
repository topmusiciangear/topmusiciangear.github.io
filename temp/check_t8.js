const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const x = p.find(y => y.id === 610);
console.log('img:', x.img);
console.log('stores:', JSON.stringify(x.stores, null, 1));
console.log('price:', x.price);
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = src.match(/^  610:.*$/m);
console.log('TEST610:', m ? m[0] : 'none');
