const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const stores = ['musicstore', 'gear4music', 'zzounds', 'reverb', 'andertons', 'amazon'];
let added = 0;
const toAdd = {};

products.forEach(p => {
  if (!p.stores) return;
  stores.forEach(store => {
    if (!p.stores[store]) return;
    // Check if this product has an entry in TEST_SHOP_BTN
    const idRegex = new RegExp('^(\\s*)' + p.id + ':\\s*\\{');
    const idMatch = block.match(idRegex);
    if (!idMatch) {
      // No entry at all - needs one with oos
      if (!toAdd[p.id]) toAdd[p.id] = [];
      toAdd[p.id].push(store);
      return;
    }
    // Check if store has price or is in oos/na
    const entryStart = block.indexOf(idMatch[0]);
    // Find the next entry
    const nextId = block.indexOf('\n' + p.id + 1 + ':', entryStart + 1);
    const entry = nextId > 0 ? block.substring(entryStart, nextId) : block.substring(entryStart);
    
    const hasPrice = entry.includes(store + ':') && !entry.includes(store + ": 'na'");
    const hasOos = entry.includes('oos:') && entry.includes("'" + store + "'");
    const hasNa = entry.includes('na:') && entry.includes("'" + store + "'");
    
    if (!hasPrice && !hasOos && !hasNa) {
      // Has URL but no price, no oos, no na - should be oos
      if (!toAdd[p.id]) toAdd[p.id] = [];
      toAdd[p.id].push(store);
    }
  });
});

console.log('Products that need oos status:', Object.keys(toAdd).length);
let total = 0;
Object.entries(toAdd).forEach(([id, sts]) => {
  const p = products.find(x => x.id === parseInt(id));
  console.log(`ID ${id} (${p ? p.title : '?'}): ${sts.join(', ')}`);
  total += sts.length;
});
console.log('Total store entries to add oos:', total);
