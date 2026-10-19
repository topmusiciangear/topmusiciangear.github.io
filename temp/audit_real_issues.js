const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const realIssues = [];

g.forEach(guide => {
  if (!guide.verdict && !guide.conclusion) return;
  
  const productIds = [];
  (guide.sections || []).forEach(s => {
    (s.products || []).forEach(id => {
      if (!productIds.includes(id)) productIds.push(id);
    });
  });
  
  const products = productIds.map(id => p.find(x => x.id === id)).filter(Boolean);
  
  if (products.length === 0) return;
  
  const verdict = (guide.verdict || '').toLowerCase();
  const conclusion = (guide.conclusion || '').toLowerCase();
  
  const missingInVerdict = [];
  
  products.forEach(prod => {
    const name = prod.title.toLowerCase();
    const brand = (prod.brand || '').toLowerCase();
    
    const nameParts = name.split(/\s+/);
    const significantPart = nameParts.length > 1 ? nameParts.slice(0, 2).join(' ') : name;
    
    const shortVariants = [
      name,
      name.replace(/\s*\d+(st|nd|rd|th)\s*gen.*$/i, ''),
      name.replace(/\s*mk[ii]?$/i, ''),
      name.replace(/\s*4th\s*gen.*$/i, ''),
      brand + ' ' + nameParts[0],
      significantPart
    ];
    
    const found = shortVariants.some(v => verdict.includes(v));
    
    if (!found && (prod.price > 150 || products.indexOf(prod) < 4)) {
      missingInVerdict.push(prod.title);
    }
  });
  
  if (missingInVerdict.length > 0 && !guide.id.includes('-vs-') && guide.id !== 'portable-interfaces') {
    realIssues.push({
      id: guide.id,
      title: guide.title_en || guide.title,
      productCount: products.length,
      missingInVerdict,
      verdict: (guide.verdict || '').substring(0, 150)
    });
  }
});

console.log(`\n=== PROBLEMAS REALES (sin comparativas) ===`);
console.log(`Total: ${realIssues.length} guías\n`);

realIssues.forEach((r, i) => {
  console.log(`${i + 1}. ${r.id} — ${r.title} (${r.productCount} productos)`);
  console.log(`   ❌ No aparecen en veredicto: ${r.missingInVerdict.join(', ')}`);
  console.log(`   Veredicto: "${r.verdict}..."`);
  console.log('');
});
