const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

const stores = ['musicstore', 'gear4music', 'zzounds', 'reverb', 'andertons', 'amazon'];
const toFix = [];

products.forEach(p => {
  if (!p.stores) return;
  const id = p.id;
  
  // Check if this ID has an entry in TEST_SHOP_BTN
  const hasEntry = new RegExp('\\b' + id + ':\\s*\\{').test(block);
  if (!hasEntry) return;
  
  // Extract the entry text
  const entryStart = block.indexOf(id + ':');
  if (entryStart < 0) return;
  
  // Find the entry content between this id and the next
  let depth = 0;
  let i = block.indexOf('{', entryStart);
  let entryEnd = i;
  for (; i < block.length; i++) {
    if (block[i] === '{') depth++;
    if (block[i] === '}') depth--;
    if (depth === 0) { entryEnd = i + 1; break; }
  }
  const entry = block.substring(entryStart, entryEnd);
  
  // Check which stores need oos
  const needsOos = [];
  stores.forEach(store => {
    if (!p.stores[store]) return;
    // Check if store has price in entry (not inside oos/na)
    const hasPrice = new RegExp(store + ":\\s*[\\x27\"$€£]").test(entry);
    const hasOos = /oos:\s*\[[^\]]*\]/.test(entry) && entry.includes("'" + store + "'");
    const hasNa = /na:\s*\[[^\]]*\]/.test(entry) && entry.includes("'" + store + "'");
    
    if (!hasPrice && !hasOos && !hasNa) {
      needsOos.push(store);
    }
  });
  
  if (needsOos.length > 0) {
    toFix.push({ id, stores: needsOos, entry });
  }
});

console.log('Entries to fix:', toFix.length);

// Now apply fixes to the full file
let fixesApplied = 0;
toFix.forEach(({ id, stores: sts }) => {
  const oosStr = sts.map(s => "'" + s + "'").join(', ');
  
  // Find the entry in the full file content
  const regex = new RegExp('(\\b' + id + ':\\s*\\{[^}]*)(\\})');
  const match = c.match(regex);
  if (!match) return;
  
  const fullEntry = match[0];
  // Check if already has oos
  if (/oos:\s*\[/.test(fullEntry)) {
    // Add to existing oos
    const newEntry = fullEntry.replace(/oos:\s*\[([^\]]*)\]/, (m, inner) => {
      const existing = inner.replace(/'/g, '').split(',').map(s => s.trim()).filter(s => s);
      const all = [...new Set([...existing, ...sts])];
      return 'oos: [' + all.map(s => "'" + s + "'").join(', ') + ']';
    });
    c = c.replace(fullEntry, newEntry);
  } else {
    // Add new oos before closing }
    const newEntry = fullEntry.replace(/\}$/, ', oos: [' + oosStr + ']}');
    c = c.replace(fullEntry, newEntry);
  }
  fixesApplied++;
});

fs.writeFileSync(file, c, 'utf8');
console.log('Applied fixes to', fixesApplied, 'entries');
