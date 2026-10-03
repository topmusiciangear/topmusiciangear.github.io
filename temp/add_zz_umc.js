const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 550);
p.stores.zzounds = 'https://www.zzounds.com/item--BEHUMC1820';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('zzounds added to 550:', JSON.stringify(Object.keys(p.stores)));