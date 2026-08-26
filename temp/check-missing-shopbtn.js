const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Extract all TEST_SHOP_BTN IDs
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];
const regex = /\b(\d+):\s*\{/g;
let match;
const shopBtnIds = new Set();
while ((match = regex.exec(block)) !== null) {
  shopBtnIds.add(parseInt(match[1]));
}

// Get all product IDs referenced in guides
const allGuideProductIds = new Set();
for (const guide of guides) {
  if (guide.products) {
    for (const pid of guide.products) {
      allGuideProductIds.add(pid);
    }
  }
}

// Find products in guides WITHOUT TEST_SHOP_BTN
const missing = [];
for (const pid of allGuideProductIds) {
  if (!shopBtnIds.has(pid)) {
    const p = products.find(x => x.id === pid);
    const hasStores = p && p.stores && Object.keys(p.stores).length > 0;
    missing.push({ 
      id: pid, 
      title: p ? p.title : '?',
      stores: hasStores ? Object.keys(p.stores).join(', ') : 'NONE',
      guide: guides.find(g => g.products && g.products.includes(pid))?.slug || '?'
    });
  }
}

console.log('Products in guides WITHOUT TEST_SHOP_BTN: ' + missing.length + ' / ' + allGuideProductIds.size + ' total');
console.log('Products WITH TEST_SHOP_BTN: ' + shopBtnIds.size);
console.log('---');
missing.sort((a,b) => a.id - b.id);
missing.forEach(x => console.log(`ID ${x.id}: ${x.title} — stores: [${x.stores}] — guide: ${x.guide}`));
