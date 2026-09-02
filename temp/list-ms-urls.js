const fs = require('fs');
const products = require('./data/products.json');

// Get all products with Music Store URLs
const msProducts = products.filter(p => p.stores && p.stores.musicstore);
console.log('Total MS products:', msProducts.length);

// Output format: ID|SKU|URL
msProducts.forEach(p => {
  const url = p.stores.musicstore;
  const artMatch = url.match(/art-([A-Z0-9-]+)/i);
  const sku = artMatch ? artMatch[1] : 'unknown';
  console.log(`${p.id}|${sku}|${url}`);
});
