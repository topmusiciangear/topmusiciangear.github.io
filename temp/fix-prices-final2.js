const fs = require('fs');

// 1. Load v2 scraped prices
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

// 2. Load products.json
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// 3. Build map: internal_id -> scraped price
const idToPrice = {};
for (const item of found) {
  const product = products[String(item.id)];
  if (!product || product.id == null) continue;
  // Remove euro sign, spaces, commas
  const num = parseFloat(item.price.replace(/[€ ,]/g, ''));
  if (isNaN(num)) continue;
  idToPrice[product.id] = num;
}
console.log('Internal IDs mapped:', Object.keys(idToPrice).length);
console.log('ID 1 (SM7B):', idToPrice[1]);
console.log('ID 50 (SM58):', idToPrice[50]);

// 4. Read build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');
const startMarker = 'const TEST_SHOP_BTN = {';
const endMarker = '\n};';
const startIdx = bg.indexOf(startMarker);
const endIdx = bg.indexOf(endMarker, startIdx + startMarker.length);
const before = bg.substring(0, startIdx);
const block = bg.substring(startIdx, endIdx + endMarker.length);
const after = bg.substring(endIdx + endMarker.length);

// 5. Update each line
const lines = block.split('\n');
const updated = [];
let updateCount = 0;

for (const line of lines) {
  const idMatch = line.match(/^  (\d+):\s*\{/);
  if (!idMatch) { updated.push(line); continue; }

  const btnId = parseInt(idMatch[1]);
  const scrapedPrice = idToPrice[btnId];
  if (scrapedPrice === undefined) { updated.push(line); continue; }

  const newPrice = '\u20AC' + scrapedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const currentMatch = line.match(/musicstore:"([^"]+)"/);
  if (!currentMatch) { updated.push(line); continue; }
  const currentPrice = currentMatch[1];
  if (currentPrice === newPrice) { updated.push(line); continue; }

  const newLine = line.replace(/musicstore:"[^"]+"/, 'musicstore:"' + newPrice + '"');
  console.log('ID:' + btnId + ': ' + currentPrice + ' -> ' + newPrice);
  updated.push(newLine);
  updateCount++;
}

console.log('\nTotal updated:', updateCount);

// 6. Write file
const newContent = before + updated.join('\n') + after;
fs.writeFileSync('build-guides.js', newContent, 'utf8');
console.log('build-guides.js written');
