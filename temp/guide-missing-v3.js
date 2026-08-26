const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const shopBtnData = {};
const regex = /\b(\d+):\s*\{([\s\S]*?)(?=\n\s*\d+:|\n\})/g;
let match;
const stores = ['amazon', 'zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];

while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  const pricesMatch = body.match(/prices:\s*\{([^}]+)\}/);
  const pricesBody = pricesMatch ? pricesMatch[1] : '';
  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  const naMatch = body.match(/na:\s*\[([^\]]*)\]/);
  const na = naMatch ? naMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  
  shopBtnData[id] = { prices: {}, oos, na };
  for (const store of stores) {
    shopBtnData[id].prices[store] = pricesBody.includes(store + ':');
  }
}

function getGuideProducts(guide) {
  const ids = new Set();
  if (guide.sections) {
    for (const section of guide.sections) {
      if (section.products) {
        for (const pid of section.products) {
          ids.add(pid);
        }
      }
    }
  }
  return [...ids];
}

const guideStats = guides.map(g => {
  const productIds = getGuideProducts(g);
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
      if (!data || (!data.prices[store] && !data.oos.includes(store) && !data.na.includes(store))) {
        missingPrices++;
        missingDetails.push({ pid, store, title: p.title });
      }
    }
  }
  
  return {
    slug: g.id,
    title: g.title,
    productCount: productIds.length,
    totalStores,
    missingPrices,
    missingDetails
  };
}).sort((a, b) => b.missingPrices - a.missingPrices);

console.log('=== TOP 20 GUIDES WITH MOST MISSING STORE PRICES ===');
console.log('');
guideStats.filter(g => g.missingPrices > 0).slice(0, 20).forEach(g => {
  console.log(`${g.slug}: ${g.missingPrices}/${g.totalStores} stores missing (${g.productCount} products)`);
  const grouped = {};
  g.missingDetails.forEach(d => {
    if (!grouped[d.pid]) grouped[d.pid] = { title: d.title, stores: [] };
    grouped[d.pid].stores.push(d.store);
  });
  Object.entries(grouped).slice(0, 5).forEach(([pid, data]) => {
    console.log(`  ID ${pid}: ${data.title} — missing: ${data.stores.join(', ')}`);
  });
  const objCount = Object.keys(grouped).length;
  if (objCount > 5) console.log(`  ... and ${objCount - 5} more products`);
  console.log('');
});

const totalMissing = guideStats.reduce((s, g) => s + g.missingPrices, 0);
const guidesWithMissing = guideStats.filter(g => g.missingPrices > 0).length;
console.log(`Total guides with missing: ${guidesWithMissing}/${guideStats.length}`);
console.log(`Total missing store entries: ${totalMissing}`);
