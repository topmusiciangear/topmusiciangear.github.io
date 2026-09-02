const fs = require('fs');

// Load scraped prices
const scraped = JSON.parse(fs.readFileSync('temp/all-ms-prices.json', 'utf8'));
const scrapedMap = {};
for (const item of scraped) {
  if (item.price && item.price !== 'ERROR') {
    // Convert to number: "€ 1,799.00" -> 1799.00
    const num = parseFloat(item.price.replace(/[€\s]/g, '').replace(',', ''));
    if (!isNaN(num)) {
      scrapedMap[item.id] = num;
    }
  }
}

console.log('Scraped prices loaded:', Object.keys(scrapedMap).length);

// Read build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');

// Find TEST_SHOP_BTN block
const startMarker = 'const TEST_SHOP_BTN = {';
const endMarker = '};';
const startIdx = bg.indexOf(startMarker);
const endIdx = bg.indexOf(endMarker, startIdx + startMarker.length);
const block = bg.substring(startIdx, endIdx + endMarker.length);

// Parse each line and update musicstore prices
const lines = block.split('\n');
const updated = [];
let updatedCount = 0;
let skippedCount = 0;

for (const line of lines) {
  const idMatch = line.match(/^\s*(\d+):\s*\{/);
  if (idMatch) {
    const btnId = parseInt(idMatch[1]);
    const productId = btnId - 1; // Convert to 0-based
    const scrapedPrice = scrapedMap[productId];
    
    if (scrapedPrice !== undefined) {
      // Format price: 1799 -> "€1,799.00"
      const formatted = '€' + scrapedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      // Replace musicstore price in this line
      const newLine = line.replace(
        /musicstore:"€[\d,.]+"/,
        'musicstore:"' + formatted + '"'
      );
      
      if (newLine !== line) {
        updated.push(newLine);
        updatedCount++;
        if (updatedCount <= 10) {
          console.log(`Updated ID:${btnId}: ${line.match(/musicstore:"([^"]+)"/)?.[1]} -> ${formatted}`);
        }
      } else {
        updated.push(line);
        skippedCount++;
      }
    } else {
      updated.push(line);
      skippedCount++;
    }
  } else {
    updated.push(line);
  }
}

console.log(`\nUpdated: ${updatedCount} prices`);
console.log(`Skipped (no scraped data): ${skippedCount}`);

// Rebuild the file
const newBlock = updated.join('\n');
const newBg = bg.substring(0, startIdx) + newBlock + bg.substring(endIdx + endMarker.length);
fs.writeFileSync('build-guides.js', newBg, 'utf8');
console.log('\nbuild-guides.js updated');
