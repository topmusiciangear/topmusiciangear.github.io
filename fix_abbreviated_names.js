const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Build a map of product titles for matching
const productTitles = products.map(p => ({ id: p.id, title: p.title, title_es: p.title_es }));

let fixedCount = 0;
let notFound = [];
let skipped = [];

guides.forEach(g => {
  if (!g.productTable || !g.productTable.columns) return;
  
  g.productTable.columns.forEach(col => {
    const title = col.title;
    // Skip non-product columns (tiers, etc.)
    if (title.startsWith('Tier ') || title.startsWith('Column ') || title === 'Best For') {
      skipped.push({ guide: g.id, title });
      return;
    }
    
    // Try exact match first
    let match = products.find(p => p.title === title);
    if (match) {
      // Already matches, no change needed
      return;
    }
    
    // Try case-insensitive match
    match = products.find(p => p.title.toLowerCase() === title.toLowerCase());
    if (match) {
      col.title = match.title;
      if (col.title_es) col.title_es = match.title_es || match.title;
      fixedCount++;
      return;
    }
    
    // Try substring match: column title is contained in product title
    const candidates = products.filter(p => 
      p.title.toLowerCase().includes(title.toLowerCase()) || 
      title.toLowerCase().includes(p.title.toLowerCase())
    );
    
    if (candidates.length === 1) {
      col.title = candidates[0].title;
      if (col.title_es) col.title_es = candidates[0].title_es || candidates[0].title;
      fixedCount++;
      return;
    }
    
    if (candidates.length > 1) {
      // Multiple matches - try to find best match by length
      const best = candidates.reduce((a, b) => 
        Math.abs(a.title.length - title.length) < Math.abs(b.title.length - title.length) ? a : b
      );
      col.title = best.title;
      if (col.title_es) col.title_es = best.title_es || best.title;
      fixedCount++;
      return;
    }
    
    // No match found
    notFound.push({ guide: g.id, title });
  });
});

// Save updated guides.json
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

console.log('=== RESULTS ===');
console.log('Fixed columns:', fixedCount);
console.log('Skipped (non-product):', skipped.length);
console.log('Not found:', notFound.length);

if (notFound.length > 0) {
  console.log('\n--- Not found ---');
  notFound.forEach(n => console.log('  ' + n.guide + ': ' + n.title));
}