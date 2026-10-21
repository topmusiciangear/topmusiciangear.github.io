const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = products.find(x => x.id === 496);
if (!p) throw new Error('no existe 496');
if (p.unit) throw new Error('496 ya tiene unit: ' + p.unit);
p.unit = 'each';
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('OK:', p.id, p.title, '-> unit', p.unit);
