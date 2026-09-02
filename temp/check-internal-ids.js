const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Check what product has internal id=33
for (const [key, p] of Object.entries(products)) {
  if (p.id === 33) {
    console.log('Product with internal id=33:', JSON.stringify({key, title: p.title, brand: p.brand}));
  }
}

// Check first 60 products' internal IDs
console.log('\nFirst 60 products internal IDs:');
for (let i = 0; i < 60; i++) {
  const p = products[String(i)];
  if (p) {
    console.log('Key:' + i + ' | internal_id:' + p.id + ' | ' + (p.title || 'no title'));
  }
}
