const fs = require('fs');

const all = [];
[0,50,100,150].forEach(i => {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) all.push(...JSON.parse(fs.readFileSync(file, 'utf8')));
});
const found = all.filter(p => p.price);
console.log('Found:', found.length);

const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Debug: iterate
const idToPrice = {};
for (let idx = 0; idx < found.length; idx++) {
  const item = found[idx];
  const key = String(item.id);
  const product = p[key];
  if (product && product.id != null) {
    const priceStr = item.price.replace(/[, ]/g, '');
    const num = parseFloat(priceStr);
    if (!isNaN(num)) {
      idToPrice[product.id] = num;
    }
  }
  if (idx < 5) {
    console.log('Item', idx, 'key:', key, 'product_id:', product?.id, 'price_str:', item.price, 'num:', parseFloat(item.price.replace(/[, ]/g, '')));
  }
}

console.log('Mapped:', Object.keys(idToPrice).length);
console.log('ID 1:', idToPrice[1]);
console.log('ID 50:', idToPrice[50]);
