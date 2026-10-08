const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = require(DIR + 'data/products.json').find(y => y.id === 612);
console.log('img:', p.img);
console.log('stores:', JSON.stringify(p.stores, null, 1));
const src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const m = src.match(/(^|\n)  612:.*$/m);
console.log('TEST612:', m ? m[0].trim().slice(0, 400) : 'none');
