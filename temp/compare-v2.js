const fs = require('fs');

// Merge all v2 results
const all = [];
for (let i = 0; i < 169; i += 50) {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) {
    all.push(...JSON.parse(fs.readFileSync(file, 'utf8')));
  }
}
const found = all.filter(p => p.price);
console.log('Total scraped:', all.length);
console.log('Found:', found.length);

// Read current TEST_SHOP_BTN prices
const bg = fs.readFileSync('build-guides.js', 'utf8');
const match = bg.match(/TEST_SHOP_BTN\s*=\s*{([\s\S]*?)\n\};/);
const block = match[1];
const currentPrices = {};
const lines = block.split('\n');
let currentId = null;
for (const line of lines) {
  const idMatch = line.match(/^\s*(\d+):\s*\{/);
  if (idMatch) currentId = parseInt(idMatch[1]);
  if (currentId !== null) {
    const msMatch = line.match(/musicstore:\s*"€?([\d,.]+)"/);
    if (msMatch) {
      currentPrices[currentId] = parseFloat(msMatch[1].replace(',', ''));
      currentId = null;
    }
  }
}

// Compare: TEST_SHOP_BTN ID = products.json ID + 1
const diffs = [];
for (const item of found) {
  const btnId = item.id + 1;
  const scrapedPrice = parseFloat(item.price.replace(/[, ]/g, ''));
  const currentPrice = currentPrices[btnId];
  if (currentPrice !== undefined && Math.abs(scrapedPrice - currentPrice) > 0.5) {
    diffs.push({
      productId: item.id,
      btnId,
      current: currentPrice,
      scraped: scrapedPrice,
      pct: ((scrapedPrice - currentPrice) / currentPrice * 100).toFixed(1)
    });
  }
}

diffs.sort((a, b) => b.scraped - a.scraped);
console.log('\nDifferences:', diffs.length);
diffs.forEach(d => {
  const arrow = d.scraped > d.current ? 'UP' : 'DOWN';
  console.log('BTN_ID:' + d.btnId + ' | Current: EUR' + d.current + ' -> Scraped: EUR' + d.scraped + ' (' + d.pct + '%) ' + arrow);
});

fs.writeFileSync('temp/price-diffs-v2.json', JSON.stringify(diffs, null, 2));
console.log('\nSaved to temp/price-diffs-v2.json');
