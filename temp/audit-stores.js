const p = require('../data/products.json');
const results = [];
for (const [id, prod] of Object.entries(p)) {
  const stores = prod.stores || {};
  const storeKeys = Object.keys(stores);
  const totalStores = storeKeys.length;
  const oos = prod.oos || [];
  const activeStores = storeKeys.filter(k => !oos.includes(k));
  results.push({
    id: parseInt(id),
    title: prod.title,
    totalStores,
    activeStores: activeStores.length,
    oosCount: oos.length,
    oos,
    storeKeys,
    price: prod.price
  });
}
results.sort((a,b) => a.totalStores - b.totalStores);

console.log('=== PRODUCTS WITH FEWER THAN 3 STORES ===\n');
for (const r of results) {
  if (r.totalStores < 3) {
    console.log(`ID ${r.id} | ${r.title}`);
    console.log(`  Stores: ${r.totalStores} | Active: ${r.activeStores} | OOS: ${r.oosCount > 0 ? r.oos.join(',') : 'none'}`);
    console.log(`  Has: ${r.storeKeys.join(', ')}`);
    // Check which stores are missing
    const allStores = ['zzounds','amazon','andertons','gear4music','musicstore','reverb','pluginboutique','official'];
    const missing = allStores.filter(s => !r.storeKeys.includes(s));
    console.log(`  Missing: ${missing.join(', ')}`);
    console.log();
  }
}

console.log('\n=== PRODUCTS WITH EXACTLY 3 STORES ===\n');
for (const r of results) {
  if (r.totalStores === 3) {
    console.log(`ID ${r.id} | ${r.title}`);
    console.log(`  Stores: ${r.totalStores} | Active: ${r.activeStores} | OOS: ${r.oosCount > 0 ? r.oos.join(',') : 'none'}`);
    console.log(`  Has: ${r.storeKeys.join(', ')}`);
    const allStores = ['zzounds','amazon','andertons','gear4music','musicstore','reverb','pluginboutique','official'];
    const missing = allStores.filter(s => !r.storeKeys.includes(s));
    console.log(`  Missing: ${missing.join(', ')}`);
    console.log();
  }
}
