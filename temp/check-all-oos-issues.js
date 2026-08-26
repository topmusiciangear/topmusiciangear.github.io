const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const stores = ['gear4music', 'amazon', 'zzounds', 'reverb', 'andertons', 'musicstore'];
const issues = [];

while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const p = products.find(x => x.id === id);
  if (!p || !p.stores) continue;

  // Check oos array
  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];

  // Check na array
  const naMatch = body.match(/na:\s*\[([^\]]*)\]/);
  const na = naMatch ? naMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];

  // Check prices
  const pricesMatch = body.match(/prices:\s*\{([^}]+)\}/);
  const pricesBody = pricesMatch ? pricesMatch[1] : '';

  for (const store of stores) {
    const hasUrl = !!p.stores[store];
    const isInOos = oos.includes(store);
    const isInNa = na.includes(store);
    const hasPrice = pricesBody.includes(store + ':');

    // Product has URL but is marked OOS — might be wrong
    if (hasUrl && isInOos && !hasPrice) {
      issues.push({ id, title: p.title, store, type: 'URL+OOS+noPrice', issue: 'Has URL in products.json, marked OOS, no price — may be available' });
    }
    // Product has URL but is marked OOS AND has a price — contradiction
    if (hasUrl && isInOos && hasPrice) {
      issues.push({ id, title: p.title, store, type: 'URL+OOS+HASprice', issue: 'Has URL AND price but also marked OOS — DEFINITELY WRONG' });
    }
    // Product has URL, not OOS, not NA, but no price — shows blank
    if (hasUrl && !isInOos && !isInNa && !hasPrice) {
      issues.push({ id, title: p.title, store, type: 'URL+noPrice+notOOS', issue: 'Has URL but no price and not OOS — shows blank button' });
    }
  }
}

console.log('=== ISSUES FOUND: ' + issues.length + ' ===');
console.log('');
issues.sort((a,b) => a.id - b.id);
issues.forEach(x => {
  console.log(`ID ${x.id} [${x.store}]: ${x.title}`);
  console.log(`  → ${x.issue}`);
  console.log('');
});
