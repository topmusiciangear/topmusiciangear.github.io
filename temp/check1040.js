const products = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
console.log('total: ' + products.length);
console.log('1031: ' + (products.some(p => p.id === 1031) ? 'SIGUE!' : 'eliminado'));
const n1040 = products.filter(p => p.id === 1040);
console.log('1040 x' + n1040.length);
if (n1040.length) console.log(JSON.stringify(n1040[0], null, 1));
