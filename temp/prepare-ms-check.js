const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const products = require(path.join(root, 'data/products.json'));
const src = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

// Extract TEST_SHOP_BTN block
const start = src.indexOf('const TEST_SHOP_BTN');
const end = src.indexOf('\n// shopButtonsTest', start);
const block = src.slice(start, end);

// Parse TEST_SHOP_BTN entries
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

// Output URLs for batch checking
const urls = msProducts.map(p => {
  const url = p.stores.musicstore;
  return { id: p.id, url, currentPrice: msPrices[p.id] || 'N/A' };
});

// Write to file for batch processing
fs.writeFileSync(path.join(__dirname, 'ms-urls-to-check.json'), JSON.stringify(urls, null, 2));
console.log('Written', urls.length, 'URLs to temp/ms-urls-to-check.json');
console.log('Sample URLs:');
urls.slice(0, 5).forEach(u => console.log(`  ID:${u.id} | Current:${u.currentPrice} | ${u.url}`));
