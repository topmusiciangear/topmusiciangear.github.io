const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(B + 'data/products.json', 'utf8');
const products = JSON.parse(raw);
const p = products.find(x => x.title.includes('8351B'));

console.log('Claves del objeto:');
console.log(Object.keys(p).map(k => k + '=' + JSON.stringify(p[k]).slice(0, 40)).join('\n'));

const i = raw.indexOf('"Genelec 8351B');
console.log('\nTrozo crudo del JSON:');
console.log(raw.slice(i - 20, i + 700));
