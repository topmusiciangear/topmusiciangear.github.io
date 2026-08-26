const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const guides = require(path.join(root, 'data', 'guides.json'));
const products = require(path.join(root, 'data', 'products.json'));

// Extract TEST_SHOP_BTN from build-guides.js
const buildSrc = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');
const startIdx = buildSrc.indexOf('const TEST_SHOP_BTN = {');
const endMarker = '\n};';
const endIdx = buildSrc.indexOf(endMarker, startIdx);
const testBlock = buildSrc.substring(startIdx, endIdx + 2);

// Parse it (replace const with var for eval)
eval(testBlock.replace('const TEST_SHOP_BTN', 'var TEST_SHOP_BTN'));

// Get all product IDs used in guides
const seen = new Set();
guides.forEach(g => {
  if (g.featuredProducts) g.featuredProducts.forEach(id => seen.add(id));
  if (g.sections) g.sections.forEach(s => { if (s.products) s.products.forEach(id => seen.add(id)); });
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => { if (c.products) c.products.forEach(id => seen.add(id)); });
  }
});

const storeKeys = ['amazon', 'zzounds', 'reverb', 'andertons', 'gear4music', 'musicstore', 'pluginboutique'];
const missing = [];

seen.forEach(pid => {
  const prod = products.find(p => p.id === pid);
  if (!prod) return;

  const cfg = TEST_SHOP_BTN[pid];
  const prices = (cfg && cfg.prices) || {};
  const oos = (cfg && cfg.oos) || [];
  const na = (cfg && cfg.na) || [];

  storeKeys.forEach(store => {
    const hasLink = prod.stores && prod.stores[store];
    const hasPrice = prices[store] !== undefined;
    const isOos = oos.includes(store);
    const isNa = na.includes(store);

    if (hasLink && !hasPrice && !isOos && !isNa) {
      missing.push({ id: pid, name: prod.title, store });
    }
  });
});

console.log(`Products with store link but NO price/oos/na: ${missing.length}\n`);

// Group by store
const byStore = {};
missing.forEach(m => {
  if (!byStore[m.store]) byStore[m.store] = [];
  byStore[m.store].push(m);
});

Object.entries(byStore).forEach(([store, items]) => {
  console.log(`\n${store} (${items.length}):`);
  items.forEach(m => console.log(`  ${m.id}: ${m.name}`));
});
