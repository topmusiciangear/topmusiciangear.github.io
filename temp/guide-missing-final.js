const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
let block = m[1].replace(/\r/g, '').trimEnd(); // Remove carriage returns and trailing whitespace

const shopBtnData = {};
const regex = /\b(\d+):\s*\{([\s\S]*?)(?=\n\s*\d+:|\n\}|$)/g;
let match;
const stores = ['amazon', 'zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];

while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  
  const oosMatch = body.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  const naMatch = body.match(/na:\s*\[([^\]]*)\]/);
  const na = naMatch ? naMatch[1].replace(/['"]/g, '').split(',').map(s => s.trim()).filter(Boolean) : [];
  
  shopBtnData[id] = { prices: {}, oos, na };
  for (const store of stores) {
    const storeRegex = new RegExp(store + ":\\s*['\"][^'\"]+['\"]");
    shopBtnData[id].prices[store] = storeRegex.test(body);
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
}).filter(g => g.missingPrices > 0).sort((a, b) => b.missingPrices - a.missingPrices);

if (guideStats.length === 0) {
  console.log('ALL GUIDES HAVE FULL STORE COVERAGE!');
} else {
  console.log('=== GUIDES WITH MISSING STORE PRICES ===');
  console.log('');
  guideStats.forEach(g => {
    console.log(`${g.slug}: ${g.missingPrices}/${g.totalStores} stores missing`);
    g.missingDetails.forEach(d => {
      console.log(`  ID ${d.pid}: ${d.title} — missing: ${d.store}`);
    });
    console.log('');
  });
}

const totalMissing = guideStats.reduce((s, g) => s + g.missingPrices, 0);
console.log(`Guides with missing: ${guideStats.length}/141`);
console.log(`Total missing store entries: ${totalMissing}`);
