const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

// Find all gear4music prices
const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const g4mPrices = [];
while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const priceMatch = body.match(/gear4music:\s*['"]([^'"]+)['"]/);
  if (priceMatch) {
    const p = products.find(x => x.id === id);
    g4mPrices.push({ id, title: p ? p.title : '?', price: priceMatch[1] });
  }
}

console.log('Gear4Music entries with prices: ' + g4mPrices.length);
g4mPrices.forEach(x => console.log(`ID ${x.id}: ${x.title} → ${x.price}`));
