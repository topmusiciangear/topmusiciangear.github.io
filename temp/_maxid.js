const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let max = 0;
p.forEach(x => { if (typeof x.id === 'number' && x.id > max) max = x.id; });
console.log('max id:', max);
console.log('count:', p.length);
console.log('---- reference: 313 (Squier Sonic Mustang) ----');
console.log(JSON.stringify(p.find(x => x.id === 313), null, 2));
