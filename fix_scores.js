const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const motu = products.find(p => p.id === 54);
const scarlett = products.find(p => p.id === 15);

if (motu) {
  console.log('MOTU M2: score ' + motu.score + ' → 9.3');
  motu.score = 9.3;
}
if (scarlett) {
  console.log('Scarlett 2i2 4th Gen: score ' + scarlett.score + ' → 9.2');
  scarlett.score = 9.2;
}

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Updated products.json');