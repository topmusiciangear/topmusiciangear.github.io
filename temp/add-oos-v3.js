const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];
const stores = ['musicstore', 'gear4music', 'zzounds', 'reverb', 'andertons', 'amazon'];
let totalAdded = 0;

products.forEach(p => {
  if (!p.stores) return;
  const id = p.id;
  
  // Find the entry line for this ID
  const lineRegex = new RegExp('\\n(\\s*)' + id + ':\\s*\\{');
  const lineMatch = c.match(lineRegex);
  if (!lineMatch) return;
  
  const lineStart = lineMatch.index;
  
  // Find entry boundaries by brace matching
  let braceStart = c.indexOf('{', lineStart);
  let depth = 0;
  let braceEnd = braceStart;
  for (let i = braceStart; i < c.length && i < braceStart + 2000; i++) {
    if (c[i] === '{') depth++;
    if (c[i] === '}') { depth--; if (depth === 0) { braceEnd = i; break; } }
  }
  const entry = c.substring(braceStart, braceEnd + 1);
  
  // Find which stores need oos
  const needsOos = [];
  stores.forEach(store => {
    if (!p.stores[store]) return; // Store has no URL for this product
    
    // Check if has price for this store
    const priceRe = new RegExp(store + ":\\s*[\"'$€£\\d]");
    if (priceRe.test(entry)) return; // Has a price
    
    // Check if in oos
    const oosRe = new RegExp("oos:\\s*\\[[^\\]]*'" + store + "'");
    if (oosRe.test(entry)) return; // Already in oos
    
    // Check if in na
    const naRe = new RegExp("na:\\s*\\[[^\\]]*'" + store + "'");
    if (naRe.test(entry)) return; // Already in na
    
    needsOos.push(store);
  });
  
  if (needsOos.length === 0) return;
  
  // Modify the entry to add oos
  const oosStr = needsOos.map(s => "'" + s + "'").join(', ');
  let newEntry;
  
  // Check if entry already has oos array
  if (/oos:\s*\[/.test(entry)) {
    newEntry = entry.replace(/oos:\s*\[([^\]]*)\]/, (m, inner) => {
      const existing = inner.replace(/'/g, '').split(',').map(s => s.trim()).filter(s => s);
      const all = [...new Set([...existing, ...needsOos])];
      return 'oos: [' + all.map(s => "'" + s + "'").join(', ') + ']';
    });
  } else {
    // Add new oos before the last }
    newEntry = entry.slice(0, -1) + ', oos: [' + oosStr + ']}';
  }
  
  c = c.substring(0, braceStart) + newEntry + c.substring(braceEnd + 1);
  totalAdded += needsOos.length;
});

fs.writeFileSync(file, c, 'utf8');
console.log('Added ' + totalAdded + ' oos entries across all products');
