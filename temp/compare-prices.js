const fs = require('fs');

// Load scraped prices
const allPrices = JSON.parse(fs.readFileSync('temp/all-ms-prices.json', 'utf8'));
const found = allPrices.filter(p => p.price && p.price !== 'ERROR');

// Load products for names
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Read TEST_SHOP_BTN from build-guides.js
const bg = fs.readFileSync('build-guides.js', 'utf8');
const match = bg.match(/TEST_SHOP_BTN\s*=\s*{([\s\S]*?)\n\};/);
if (!match) { console.log('TEST_SHOP_BTN not found'); process.exit(1); }

// Extract current musicstore prices using simpler approach
const priceBlock = match[1];
const currentPrices = {};
const lines = priceBlock.split('\n');
let currentId = null;
for (const line of lines) {
  const idMatch = line.match(/^\s*(\d+):\s*\{/);
  if (idMatch) currentId = parseInt(idMatch[1]);
  if (currentId !== null) {
    const msMatch = line.match(/musicstore:\s*["']€?([\d,.]+)["']/);
    if (msMatch) {
      currentPrices[currentId] = parseFloat(msMatch[1].replace(',', ''));
      currentId = null;
    }
  }
}

console.log('Current TEST_SHOP_BTN prices found:', Object.keys(currentPrices).length);

// Compare
const diffs = [];
const same = [];
for (const item of found) {
  const scrapedPrice = parseFloat(item.price.replace(/[€\s]/g, '').replace(',', ''));
  const currentPrice = currentPrices[item.id];
  if (currentPrice !== undefined) {
    if (Math.abs(scrapedPrice - currentPrice) > 0.5) {
      diffs.push({
        id: item.id,
        name: products[item.id]?.name || item.slug,
        current: currentPrice,
        scraped: scrapedPrice,
        pct: ((scrapedPrice - currentPrice) / currentPrice * 100).toFixed(1)
      });
    } else {
      same.push(item.id);
    }
  }
}

diffs.sort((a, b) => b.scraped - a.scraped);
console.log('\nPrices that MATCH:', same.length);
console.log('Prices that DIFFER:', diffs.length);

if (diffs.length > 0) {
  console.log('\n=== DIFFERENCES ===');
  diffs.forEach(d => {
    const arrow = d.scraped > d.current ? '↑' : '↓';
    console.log(`ID:${d.id} | ${d.name} | Current: €${d.current} → Scraped: €${d.scraped} (${d.pct}%) ${arrow}`);
  });
}

// Save diff for apply script
fs.writeFileSync('temp/price-diffs.json', JSON.stringify(diffs, null, 2));
