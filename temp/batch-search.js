const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const products = require(path.join(root, 'data/products.json'));

const msProducts = products.filter(p => p.stores && p.stores.musicstore);
const skus = msProducts.map(p => {
  const url = p.stores.musicstore;
  const artMatch = url.match(/art-([A-Z0-9-]+)/i);
  const sku = artMatch ? artMatch[1].replace(/-000$/, '') : null;
  return { id: p.id, sku, url };
}).filter(x => x.sku);

// Output as batches of 5 for Google search
for (let i = 0; i < skus.length; i += 5) {
  const batch = skus.slice(i, i + 5);
  const query = batch.map(x => `site:musicstore.com ${x.sku}`).join(' OR ');
  console.log(`Batch ${Math.floor(i/5) + 1}: ${query}`);
}
