const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p55 = products.find(p => p.id === 55);

if (p55) {
  p55.stores.zzounds = "https://www.zzounds.com/item--UADVOLT2G2?siid=394656";
  p55.oos = [];
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
  console.log('Updated product 55 (Volt 2 Gen 2):');
  console.log('  zZounds store:', p55.stores.zzounds);
  console.log('  oos:', p55.oos);
} else {
  console.log('Product 55 not found');
}