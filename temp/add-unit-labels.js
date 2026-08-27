const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Each = sold individually, Pair = sold as a pair
const eachIds = [
  // Studio monitors (each)
  19, 20, 21, 22, 116, 117, 180, 181, 199, 220, 221, 222, 223, 224,
  303, 305, 331, 371, 372,
  // Subwoofers (each)
  191, 192, 193, 300, 301, 337, 338,
  // PA speakers (each)
  105, 106, 108, 151, 153, 154, 216, 217, 218, 219, 225,
  // PA subwoofers (each)
  233, 234, 235, 236, 237,
  // Column PA systems (each)
  109, 152,
];

const pairIds = [
  // Monitor pairs
  302, 304, 306, 307, 308,
];

let added = 0;
products.forEach(p => {
  if (eachIds.indexOf(p.id) >= 0) {
    p.unit = 'each';
    added++;
  } else if (pairIds.indexOf(p.id) >= 0) {
    p.unit = 'pair';
    added++;
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Added unit field to ${added} products`);
