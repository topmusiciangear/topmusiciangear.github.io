const fs = require('fs');

// Load v2 scraped prices
const all = [];
for (let i = 0; i < 169; i += 50) {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) {
    all.push(...JSON.parse(fs.readFileSync(file, 'utf8')));
  }
}
const found = all.filter(p => p.price);
console.log('V2 scraped prices:', found.length);

// Load products.json
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('Products loaded:', Object.keys(products).length);

// Debug: test first 3 mappings
for (const item of found.slice(0, 3)) {
  const key = String(item.id);
  const product = products[key];
  console.log('Key:' + item.id + ' product:', product ? product.id : 'NOT FOUND');
}

// Build map: internal_id -> scraped price (as number)
const idToPrice = {};
for (const item of found) {
  const key = String(item.id);
  const product = products[key];
  if (product && product.id !== undefined) {
    const numPrice = parseFloat(item.price.replace(/[, ]/g, ''));
    if (!isNaN(numPrice)) {
      idToPrice[product.id] = numPrice;
    }
  }
}
console.log('Internal IDs mapped:', Object.keys(idToPrice).length);

// Verify SM58 is in the map
console.log('ID 50 in map:', idToPrice[50]);

// Read build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');
const startMarker = 'const TEST_SHOP_BTN = {';
const endMarker = '};';
const startIdx = bg.indexOf(startMarker);
const endIdx = bg.indexOf(endMarker, startIdx + startMarker.length);
const block = bg.substring(startIdx, endIdx + endMarker.length);

// Update TEST_SHOP_BTN entries
const lines = block.split('\n');
const updated = [];
let updatedCount = 0;

for (const line of lines) {
  const idMatch = line.match(/^\s*(\d+):\s*\{/);
  if (idMatch) {
    const btnId = parseInt(idMatch[1]);
    const scrapedPrice = idToPrice[btnId];
    
    if (scrapedPrice !== undefined) {
      const formatted = '\u20AC' + scrapedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      const newLine = line.replace(
        /musicstore:"[^\d]*[\d,.]+"/,
        'musicstore:"' + formatted + '"'
      );
      
      if (newLine !== line) {
        const oldMatch = line.match(/musicstore:"([^"]+)"/);
        const oldPrice = oldMatch ? oldMatch[1] : 'none';
        if (oldPrice !== formatted) {
          console.log('ID:' + btnId + ': ' + oldPrice + ' -> ' + formatted);
          updated.push(newLine);
          updatedCount++;
          continue;
        }
      }
    }
  }
  updated.push(line);
}

console.log('\nTotal updated:', updatedCount);

const newBlock = updated.join('\n');
const newBg = bg.substring(0, startIdx) + newBlock + bg.substring(endIdx + endMarker.length);
fs.writeFileSync('build-guides.js', newBg, 'utf8');
console.log('build-guides.js updated');
