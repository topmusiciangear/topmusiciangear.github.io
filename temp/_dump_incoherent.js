const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n  \};/);
eval('var TEST_SHOP_BTN = {' + m[1] + '\n};');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const byId = {}; prods.forEach(p => { byId[p.id] = p; });

const ids = [28,39,59,60,67,68,75,93,112,118,119,153,159,162,173,176,206,214,254,256,269,302,304,326,338,345,347,348,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,390,421,425];
for (const id of ids) {
  const p = byId[id];
  if (!p) { console.log(`[${id}] (no product)`); continue; }
  const cfg = TEST_SHOP_BTN[id] || {};
  console.log(`[${id}] "${p.title}" cat=${p.category} catalogPrice=${JSON.stringify(p.price)}`);
  console.log(`    TEST_SHOP_BTN: ${JSON.stringify(cfg)}`);
  console.log(`    stores: ${JSON.stringify(p.stores ? Object.keys(p.stores) : null)}`);
}