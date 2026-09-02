const fs = require('fs');
const all = [];
for (let i = 0; i < 169; i += 50) {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) {
    all.push(...JSON.parse(fs.readFileSync(file, 'utf8')));
  }
}
const found = all.filter(p => p.price);
console.log('Found:', found.length);
console.log('First 5:', found.slice(0, 5));

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Test mapping for first 5
for (const item of found.slice(0, 5)) {
  const key = String(item.id);
  const product = products[key];
  const internalId = product?.id;
  console.log('Key:' + item.id + ' -> internal_id:' + internalId + ' | price:' + item.price);
}
