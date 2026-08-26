const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const stores = ['gear4music', 'amazon', 'zzounds', 'reverb', 'andertons', 'musicstore'];
const counts = { 'URL+OOS+noPrice': 0, 'URL+OOS+HASprice': 0, 'URL+noPrice+notOOS': 0 };
const uniqueIds = new Set();

while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const p = products.find(x => x.id === id);
  if (!p || !p.stores) continue;

  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  const naMatch = body.match(/na:\s*\[([^\]]*)\]/);
  const na = naMatch ? naMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  const pricesMatch = body.match(/prices:\s*\{([^}]+)\}/);
  const pricesBody = pricesMatch ? pricesMatch[1] : '';

  for (const store of stores) {
    const hasUrl = !!p.stores[store];
    const isInOos = oos.includes(store);
    const isInNa = na.includes(store);
    const hasPrice = pricesBody.includes(store + ':');

    if (hasUrl && isInOos && !hasPrice) {
      counts['URL+OOS+noPrice']++;
    } else if (hasUrl && isInOos && hasPrice) {
      counts['URL+OOS+HASprice']++;
      uniqueIds.add(id);
    } else if (hasUrl && !isInOos && !isInNa && !hasPrice) {
      counts['URL+noPrice+notOOS']++;
      uniqueIds.add(id);
    }
  }
}

console.log('=== ISSUE SUMMARY ===');
console.log('URL+OOS+noPrice (marked OOS, no price — shows "Out of stock"): ' + counts['URL+OOS+noPrice']);
console.log('URL+OOS+HASprice (marked OOS BUT has price — DEFINITELY WRONG): ' + counts['URL+OOS+HASprice']);
console.log('URL+noPrice+notOOS (has URL, no price, not OOS — BLANK BUTTON): ' + counts['URL+noPrice+notOOS']);
console.log('Unique products affected: ' + uniqueIds.size);
console.log('');
console.log('=== CRITICAL: Products with price BUT also marked OOS ===');
// List those with price+OOS contradiction
const regex2 = /\b(\d+):\s*\{([^}]+)\}/g;
while ((match = regex2.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const p = products.find(x => x.id === id);
  if (!p || !p.stores) continue;
  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  const pricesMatch = body.match(/prices:\s*\{([^}]+)\}/);
  const pricesBody = pricesMatch ? pricesMatch[1] : '';
  for (const store of stores) {
    const hasUrl = !!p.stores[store];
    const isInOos = oos.includes(store);
    const hasPrice = pricesBody.includes(store + ':');
    if (hasUrl && isInOos && hasPrice) {
      const priceMatch = pricesBody.match(new RegExp(store + ":\\s*['\"]([^'\"]+)['\"]"));
      console.log(`ID ${id} [${store}]: ${p.title} — price: ${priceMatch ? priceMatch[1] : '?'} — IN OOS ARRAY!`);
    }
  }
}
