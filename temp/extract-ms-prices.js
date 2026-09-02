const fs = require('fs');
const src = fs.readFileSync('build-guides.js','utf8');
const start = src.indexOf('const TEST_SHOP_BTN');
const end = src.indexOf('\n// shopButtonsTest', start);
const block = src.slice(start, end);

// Extract all entries with musicstore price
const re = /(\d+):\s*\{[\s\S]*?prices:\s*\{[\s\S]*?musicstore:\s*['"]([^'"]+)['"]/g;
let m;
const results = [];
while ((m = re.exec(block)) !== null) {
  results.push({id: parseInt(m[1]), msPrice: m[2]});
}
console.log('Products with musicstore price in TEST_SHOP_BTN:', results.length);
results.forEach(r => console.log('ID:' + r.id + ' | MS Price:' + r.msPrice));
