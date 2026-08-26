const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const stores = ['musicstore', 'gear4music', 'zzounds', 'reverb', 'andertons', 'amazon'];
let fixed = 0;

// For each product, find its entry and add missing stores to oos
products.forEach(p => {
  if (!p.stores) return;
  const id = p.id;
  
  // Find the entry in TEST_SHOP_BTN
  const idRegex = new RegExp('(\\n\\s*)' + id + ':\\s*\\{');
  const idMatch = c.match(idRegex);
  if (!idMatch) return;
  
  const entryStart = idMatch.index;
  
  // Find the end of this entry (next ID or end of object)
  const nextEntry = c.indexOf('\n' + id + 1 + ':', entryStart + 1);
  const entryEnd = nextEntry > 0 ? nextEntry : c.indexOf('\n};', entryStart);
  const entry = c.substring(entryStart, entryEnd);
  
  // Check which stores need oos
  const needsOos = [];
  stores.forEach(store => {
    if (!p.stores[store]) return; // No URL for this store
    // Check if store has price in entry
    const hasPrice = new RegExp(store + ":\\s*['\"\x24€£]").test(entry);
    // Check if already in oos
    const hasOos = entry.includes('oos:') && entry.includes("'" + store + "'");
    // Check if in na
    const hasNa = entry.includes('na:') && entry.includes("'" + store + "'");
    
    if (!hasPrice && !hasOos && !hasNa) {
      needsOos.push(store);
    }
  });
  
  if (needsOos.length === 0) return;
  
  // Add to oos - find existing oos or na and extend, or add new
  let newEntry = entry;
  
  // Check if entry already has oos array
  const oosMatch = entry.match(/oos:\s*\[([^\]]*)\]/);
  if (oosMatch) {
    // Extend existing oos array
    const existing = oosMatch[1].replace(/'/g, '').split(',').map(s => s.trim()).filter(s => s);
    const all = [...new Set([...existing, ...needsOos])];
    const newOos = all.map(s => "'" + s + "'").join(', ');
    newEntry = entry.replace(/oos:\s*\[[^\]]*\]/, 'oos: [' + newOos + ']');
  } else if (entry.includes('na:')) {
    // Has na but no oos - add oos before na
    const naMatch = entry.match(/(\s*na:\s*\[[^\]]*\])/);
    if (naMatch) {
      const oosStr = needsOos.map(s => "'" + s + "'").join(', ');
      newEntry = entry.replace(naMatch[0], ' oos: [' + oosStr + '],' + naMatch[0]);
    }
  } else {
    // No oos or na - add oos at the end of the entry
    const oosStr = needsOos.map(s => "'" + s + "'").join(', ');
    // Find the closing } of the entry
    const lastBrace = newEntry.lastIndexOf('}');
    newEntry = newEntry.substring(0, lastBrace) + ', oos: [' + oosStr + ']' + newEntry.substring(lastBrace);
  }
  
  if (newEntry !== entry) {
    c = c.substring(0, entryStart) + newEntry + c.substring(entryEnd);
    fixed += needsOos.length;
  }
});

fs.writeFileSync(file, c, 'utf8');
console.log('Added oos status to ' + fixed + ' store entries');
