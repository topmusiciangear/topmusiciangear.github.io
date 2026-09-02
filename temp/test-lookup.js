const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('products 33 exists:', '33' in products);
console.log('products 33 id:', products['33']?.id);

// Test the mapping
const testItem = { id: 33 };
const testResult = products[String(testItem.id)];
console.log('Test lookup:', testResult?.id, testResult?.title);
