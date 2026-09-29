const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const arr = Array.isArray(guides) ? guides : (guides.guides || Object.values(guides));
const g = arr.find(x => x.id === 'best-electric-guitars-2026');
if (!g) { console.log('GUIDE NOT FOUND'); process.exit(1); }
const ids = new Set();
const walk = (o) => {
  if (Array.isArray(o)) return o.forEach(walk);
  if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      if ((k === 'products' || k === 'featuredProducts') && Array.isArray(v)) v.forEach(i => { if (typeof i === 'number') ids.add(i); });
      if ((k === 'products' || k === 'featuredProducts') && typeof v === 'number') ids.add(v);
      if (k === 'id' && typeof v === 'number' && v < 1000) { /* table rows may embed */ }
      walk(v);
    }
  }
};
walk(g);
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const plist = Array.isArray(products) ? products : (products.products || Object.values(products));
const bg = fs.readFileSync('build-guides.js', 'utf8');
const m = bg.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const shopMap = m ? Function('return {' + m[1] + '\n}')() : {};
const list = [...ids].sort((a, b) => a - b);
console.log('Guide: best-electric-guitars-2026 | products: ' + list.length);
console.log('IDS: ' + list.join(','));
for (const id of list) {
  const p = plist.find(x => x.id === id);
  console.log('\n=== id ' + id + ' :: ' + (p ? p.title : 'NOT IN CATALOG'));
  if (!p) continue;
  const cfg = shopMap[id] || {};
  const stores = Object.keys(p.stores || {});
  const ex = p.excludeStores || [];
  const oosCat = p.oos || [];
  console.log('  cat price: ' + p.price + '  catOOS: [' + oosCat.join(',') + ']  exclude: [' + ex.join(',') + ']');
  const all = ['zzounds', 'andertons', 'musicstore', 'gear4music', 'amazon', 'reverb', 'pluginboutique', 'hollyland', 'official'];
  for (const s of all) {
    const has = stores.includes(s);
    const u = (p.stores || {})[s] || cfg.urls?.[s] || '';
    const pr = cfg.prices?.[s] || '';
    const flags = [];
    if (ex.includes(s)) flags.push('EXCL');
    if (oosCat.includes(s)) flags.push('CAT_OOS');
    if (cfg.oos?.includes(s)) flags.push('OOS');
    if (cfg.na?.includes(s)) flags.push('NA');
    if (has || pr || flags.length) {
      console.log('   ' + s.padEnd(13) + ' store=' + (has ? 'Y' : '-') + ' price=' + (pr || '-').padEnd(11) + ' ' + flags.join(',') + ' ' + u.slice(0, 130));
    }
  }
}
