const fs = require('fs');

// 1. Load v2 scraped prices
const all = [];
for (let i = 0; i < 169; i += 50) {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    all.push(...data);
  }
}
const found = all.filter(p => p.price);
console.log('Step 1: V2 scraped prices loaded:', found.length);

// 2. Load products.json
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('Step 2: Products loaded:', Object.keys(products).length);

// 3. Build map: internal_id -> scraped price
const idToPrice = {};
for (const item of found) {
  const key = String(item.id);
  const product = products[key];
  if (!product) continue;
  const internalId = product.id;
  if (internalId === undefined || internalId === null) continue;
  const priceStr = item.price.replace(/[, ]/g, '');
  const numPrice = parseFloat(priceStr);
  if (isNaN(numPrice)) continue;
  idToPrice[internalId] = numPrice;
}
console.log('Step 3: Internal IDs mapped:', Object.keys(idToPrice).length);
console.log('  SM58 (ID 50):', idToPrice[50] || 'NOT FOUND');
console.log('  SM7B (ID 1):', idToPrice[1] || 'NOT FOUND');

// 4. Read build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');
const startMarker = 'const TEST_SHOP_BTN = {';
const endMarker = '\n};';
const startIdx = bg.indexOf(startMarker);
const endIdx = bg.indexOf(endMarker, startIdx + startMarker.length);
if (startIdx === -1 || endIdx === -1) {
  console.log('ERROR: TEST_SHOP_BTN not found');
  process.exit(1);
}
const before = bg.substring(0, startIdx);
const block = bg.substring(startIdx, endIdx + endMarker.length);
const after = bg.substring(endIdx + endMarker.length);

// 5. Update each line
const lines = block.split('\n');
const updated = [];
let updateCount = 0;

for (const line of lines) {
  const idMatch = line.match(/^  (\d+):\s*\{/);
  if (!idMatch) {
    updated.push(line);
    continue;
  }

  const btnId = parseInt(idMatch[1]);
  const scrapedPrice = idToPrice[btnId];

  if (scrapedPrice === undefined) {
    updated.push(line);
    continue;
  }

  // Format new price
  const newPrice = '\u20AC' + scrapedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get current musicstore price
  const currentMatch = line.match(/musicstore:"([^"]+)"/);
  if (!currentMatch) {
    updated.push(line);
    continue;
  }
  const currentPrice = currentMatch[1];

  if (currentPrice === newPrice) {
    updated.push(line);
    continue;
  }

  // Replace
  const newLine = line.replace(/musicstore:"[^"]+"/, 'musicstore:"' + newPrice + '"');
  console.log('  ID:' + btnId + ': ' + currentPrice + ' -> ' + newPrice);
  updated.push(newLine);
  updateCount++;
}

console.log('\nStep 5: Updated:', updateCount, 'prices');

// 6. Write file
const newBlock = updated.join('\n');
const newContent = before + newBlock + after;
fs.writeFileSync('build-guides.js', newContent, 'utf8');
console.log('Step 6: build-guides.js written');
