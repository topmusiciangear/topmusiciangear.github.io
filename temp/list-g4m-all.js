const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

// Find all gear4music prices and extract numeric values
const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const suspicious = [];
while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const priceMatch = body.match(/gear4music:\s*['"]£([0-9,.]+)['"]/);
  if (priceMatch) {
    const priceStr = priceMatch[1].replace(/,/g, '');
    const price = parseFloat(priceStr);
    if (price > 0) {
      suspicious.push({ id, price, raw: priceMatch[1] });
    }
  }
}

// Sort by price (lowest first) to find suspiciously cheap items
suspicious.sort((a, b) => a.price - b.price);

// Show items that seem too cheap for G4M (under £200 but known expensive products)
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('=== ALL G4M PRICES (sorted low to high) ===');
suspicious.forEach(x => {
  const p = products.find(y => y.id === x.id);
  const title = p ? p.title : '?';
  console.log(`ID ${x.id}: £${x.raw} — ${title}`);
});
