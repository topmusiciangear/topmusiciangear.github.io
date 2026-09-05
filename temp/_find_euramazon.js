const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n  \};/);
eval('var TEST_SHOP_BTN = {' + m[1] + '\n};');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  for (const [shop, pr] of Object.entries(cfg.prices || {})) {
    if (shop === 'amazon' && String(pr).startsWith('€')) {
      const p = prods.find(x => x.id === Number(id));
      console.log(`[${id}] ${shop}=${pr} | "${p ? p.title : '?'}" stores=${p ? JSON.stringify(Object.keys(p.stores)) : '?'} oos=${JSON.stringify(cfg.oos)} na=${JSON.stringify(cfg.na)} urls=${JSON.stringify(cfg.urls) || ''}`);
    }
  }
}
// also amazon prices in any other currency mislabeled? check amazon "£"
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  for (const [shop, pr] of Object.entries(cfg.prices || {})) {
    if (shop === 'amazon' && String(pr).startsWith('£')) {
      console.log(`GBP-AMAZON [${id}]: amazon=${pr}`);
    }
  }
}