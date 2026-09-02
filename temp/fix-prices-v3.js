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

// Load products.json to get key -> internal_id mapping
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const keyToInternalId = {};
for (const [key, p] of Object.entries(products)) {
  keyToInternalId[parseInt(key)] = p.id;
}

// Build map: internal_id -> scraped price
const idToPrice = {};
for (const item of found) {
  const internalId = keyToInternalId[item.id];
  if (internalId !== undefined) {
    const numPrice = parseFloat(item.price.replace(/[, ]/g, ''));
    idToPrice[internalId] = numPrice;
  }
}

console.log('Internal IDs mapped:', Object.keys(idToPrice).length);

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
      // Format price
      const formatted = 'EUR' + scrapedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      // Replace musicstore price
      const newLine = line.replace(
        /musicstore:"EUR[\d,.]+"/,
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

// Write updated file
const newBlock = updated.join('\n');
const newBg = bg.substring(0, startIdx) + newBlock + bg.substring(endIdx + endMarker.length);
fs.writeFileSync('build-guides.js', newBg, 'utf8');
console.log('build-guides.js updated');
