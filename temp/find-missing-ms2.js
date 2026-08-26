const guides = require('./data/guides.json');
const seen = new Set();
const missing = [];

// Extract TEST_SHOP_BTN block
const fs = require('fs');
const buildSrc = fs.readFileSync('./build-guides.js', 'utf8');
const match = buildSrc.match(/function shopButtonsTest\(\) \{[\s\S]*?return btns;\s*\}/);
if (!match) { console.log('TEST_SHOP_BTN not found'); process.exit(); }

const testBlock = match[0];

guides.forEach(g => {
  const products = [];
  if (g.featuredProducts) products.push(...g.featuredProducts);
  if (g.sections) g.sections.forEach(s => { if (s.products) products.push(...s.products); });
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => { if (c.products) products.push(...c.products); });
  }
  products.forEach(pid => {
    if (seen.has(pid)) return;
    seen.add(pid);

    const pidStr = `'${pid}'`;
    const idx = testBlock.indexOf(pidStr);
    if (idx === -1) return;

    // Find Music Store price in next 300 chars
    const afterPid = testBlock.substring(idx, idx + 300);
    const hasMSLink = afterPid.includes('musicstore') || afterPid.includes('awin1.com/cread.php?awinmid=63816');
    const hasPrice = /musicstore[^}]*?(\d+\.\d{2})/.test(afterPid) || /price:\s*['"]?\d+/.test(afterPid.match(/musicstore[^}]*?price[^}]*/)?.[0] || '');

    if (hasMSLink && !hasPrice) {
      const prod = require('./data/products.json').find(p => p.id === pid);
      missing.push({ id: pid, name: prod ? prod.title : 'Unknown' });
    }
  });
});

console.log(`Products with Music Store link but NO price in TEST_SHOP_BTN: ${missing.length}\n`);
missing.forEach(m => console.log(`  ${m.id}: ${m.name}`));
