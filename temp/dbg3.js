const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
let p = fs.readFileSync(f, 'utf8');
const i = p.indexOf('Nano Small Stone');
const seg = p.slice(i, i + 1600);
const k = seg.indexOf('"stores"');
console.log(JSON.stringify(seg.slice(k, k + 600)));
