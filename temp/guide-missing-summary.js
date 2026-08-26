const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

// Build map of which products have TEST_SHOP_BTN with prices for which stores
const shopBtnData = {};
const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const stores = ['amazon', 'zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];

while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const pricesMatch = body.match(/prices:\s*\{([^}]+)\}/);
  const pricesBody = pricesMatch ? pricesMatch[1] : '';
  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  
  shopBtnData[id] = { prices: {}, oos };
  for (const store of stores) {
    shopBtnData[id].prices[store] = pricesBody.includes(store + ':');
  }
}

// For each guide, count how many products have missing store data
const guideStats = guides.map(g => {
  const productIds = g.products || [];
  let missingPrices = 0;
  let totalStores = 0;
  let missingDetails = [];
  
  for (const pid of productIds) {
    const p = products.find(x => x.id === pid);
    if (!p || !p.stores) continue;
    
    for (const store of stores) {
      if (!p.stores[store]) continue;
      totalStores++;
      const data = shopBtnData[pid];
      if (!data || (!data.prices[store] && !data.oos.includes(store))) {
        missingPrices++;
        missingDetails.push({ pid, store, title: p.title });
      }
    }
  }
  
  return {
    slug: g.slug || g.id,
    title: g.title || g.slug,
    productCount: productIds.length,
    totalStores,
    missingPrices,
    missingDetails
  };
}).sort((a, b) => b.missingPrices - a.missingPrices);

// Show top 20 guides with most missing
console.log('=== GUIDES WITH MOST MISSING STORE PRICES ===');
console.log('');
guideStats.slice(0, 20).forEach(g => {
  console.log(`${g.slug}: ${g.missingPrices}/${g.totalStores} stores missing (${g.productCount} products)`);
  if (g.missingDetails.length > 0) {
    const sample = g.missingDetails.slice(0, 5);
    sample.forEach(d => console.log(`  ID ${d.pid} [${d.store}]: ${d.title}`));
    if (g.missingDetails.length > 5) console.log(`  ... and ${g.missingDetails.length - 5} more`);
  }
  console.log('');
});

console.log('Total guides: ' + guideStats.length);
console.log('Total missing store entries: ' + guideStats.reduce((s, g) => s + g.missingPrices, 0));
