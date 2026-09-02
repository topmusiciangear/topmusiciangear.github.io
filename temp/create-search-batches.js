const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const products = require(path.join(root, 'data/products.json'));
const src = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

// Extract TEST_SHOP_BTN block
const start = src.indexOf('const TEST_SHOP_BTN');
const end = src.indexOf('\n// shopButtonsTest', start);
const block = src.slice(start, end);

// Parse all TEST_SHOP_BTN entries with musicstore prices
const entryRe = /(\d+):\s*\{([\s\S]*?)\n\s*\}/g;
const msPrices = {};
let m;
while ((m = entryRe.exec(block)) !== null) {
  const id = parseInt(m[1]);
  const body = m[2];
  const msMatch = body.match(/musicstore:\s*['"]([^'"]+)['"]/);
  if (msMatch) {
    msPrices[id] = msMatch[1];
  }
}

// Get products with Music Store URLs
const msProducts = products.filter(p => p.stores && p.stores.musicstore);

// Create search queries - 3 SKUs per batch
const batches = [];
for (let i = 0; i < msProducts.length; i += 3) {
  const batch = msProducts.slice(i, i + 3);
  const skus = batch.map(p => {
    const url = p.stores.musicstore;
    const artMatch = url.match(/art-([A-Z0-9-]+)/i);
    return artMatch ? artMatch[1].replace(/-000$/, '') : null;
  }).filter(Boolean);
  
  if (skus.length > 0) {
    batches.push({
      query: `site:musicstore.com/en_OT/EUR "${skus.join('" || "')}"`,
      products: batch.map(p => ({
        id: p.id,
        sku: p.stores.musicstore.match(/art-([A-Z0-9-]+)/i)?.[1]?.replace(/-000$/, ''),
        currentPrice: msPrices[p.id] || 'N/A',
        name: p.name
      }))
    });
  }
}

// Write batches to file
fs.writeFileSync(path.join(__dirname, 'ms-search-batches.json'), JSON.stringify(batches, null, 2));
console.log(`Created ${batches.length} batches for ${msProducts.length} products`);
console.log('First 3 batches:');
batches.slice(0, 3).forEach((b, i) => {
  console.log(`\nBatch ${i + 1}:`);
  console.log(`  Query: ${b.query}`);
  b.products.forEach(p => console.log(`  ID:${p.id} | Current:${p.currentPrice} | ${p.sku}`));
});
