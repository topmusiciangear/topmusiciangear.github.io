const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Find SM58
for (const [id, p] of Object.entries(products)) {
  const title = (p.title || '').toLowerCase();
  const desc = (p.desc || '').toLowerCase();
  if (title.includes('sm58') || title.includes('sm 58') || desc.includes('sm58')) {
    console.log('ID:' + id + ' | Title: ' + p.title + ' | Brand: ' + p.brand);
    if (p.stores && p.stores.musicstore) {
      const url = p.stores.musicstore.url || p.stores.musicstore;
      console.log('  MS URL: ' + url.substring(0, 80));
    }
  }
}

// Also check which products have TEST_SHOP_BTN entries
const bg = fs.readFileSync('build-guides.js', 'utf8');
const match = bg.match(/TEST_SHOP_BTN\s*=\s*{([\s\S]*?)\n\};/);
const block = match[1];
const btnIds = [];
const re = /^  (\d+):/gm;
let m;
while ((m = re.exec(block)) !== null) {
  btnIds.push(parseInt(m[1]));
}
console.log('\nTEST_SHOP_BTN IDs:', btnIds.slice(0, 20), '... total:', btnIds.length);
console.log('Min:', Math.min(...btnIds), 'Max:', Math.max(...btnIds));

// Check what product has id=50
const p50 = products['50'];
if (p50) console.log('\nProduct with id 50:', p50.title, '| Brand:', p50.brand);

// Check what product has id=51
const p51 = products['51'];
if (p51) console.log('Product with id 51:', p51.title, '| Brand:', p51.brand);
