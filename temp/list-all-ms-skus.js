const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const products = require(path.join(root, 'data/products.json'));
const src = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

// Extract TEST_SHOP_BTN block
const start = src.indexOf('const TEST_SHOP_BTN');
const end = src.indexOf('\n// shopButtonsTest', start);
const block = src.slice(start, end);

// Parse all TEST_SHOP_BTN entries
const entryRe = /(\d+):\s*\{([\s\S]*?)\n\s*\}/g;
const allEntries = {};
let m;
while ((m = entryRe.exec(block)) !== null) {
  const id = parseInt(m[1]);
  const body = m[2];
  
  const msMatch = body.match(/musicstore:\s*['"]([^'"]+)['"]/);
  const priceMatch = body.match(/prices:\s*\{([^}]+)\}/);
  
  allEntries[id] = {
    msPrice: msMatch ? msMatch[1] : null,
    hasMusicstoreUrl: products.some(p => p.id === id && p.stores && p.stores.musicstore)
  };
}

// Get all products with Music Store URLs
const msProducts = products.filter(p => p.stores && p.stores.musicstore);

// Output all SKUs for batch processing
const skus = msProducts.map(p => {
  const url = p.stores.musicstore;
  const artMatch = url.match(/art-([A-Z0-9-]+)/i);
  const sku = artMatch ? artMatch[1].replace(/-000$/, '') : null;
  const entry = allEntries[p.id];
  return {
    id: p.id,
    sku,
    currentMsPrice: entry?.msPrice || 'N/A',
    name: p.name || 'Unknown'
  };
}).filter(x => x.sku);

// Group into batches of 10 for efficient searching
const batches = [];
for (let i = 0; i < skus.length; i += 10) {
  batches.push(skus.slice(i, i + 10));
}

console.log(`Total products to verify: ${skus.length}`);
console.log(`Batches of 10: ${batches.length}`);
console.log('\nFirst 5 batches:');
batches.slice(0, 5).forEach((batch, i) => {
  console.log(`\nBatch ${i + 1}:`);
  batch.forEach(p => console.log(`  ${p.id}: ${p.sku} (current: ${p.currentMsPrice})`));
});
