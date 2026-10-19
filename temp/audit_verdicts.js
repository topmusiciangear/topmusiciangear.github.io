const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const results = [];

g.forEach(guide => {
  if (!guide.verdict && !guide.conclusion) return;
  
  const productIds = [];
  (guide.sections || []).forEach(s => {
    (s.products || []).forEach(id => {
      if (!productIds.includes(id)) productIds.push(id);
    });
  });
  
  const products = productIds.map(id => p.find(x => x.id === id)).filter(Boolean);
  const productNames = products.map(p => p.title);
  
  const verdict = guide.verdict || '';
  const conclusion = guide.conclusion || '';
  
  const verdictLower = verdict.toLowerCase();
  const conclusionLower = conclusion.toLowerCase();
  
  const missingInVerdict = [];
  const missingInConclusion = [];
  
  products.forEach(prod => {
    const name = prod.title.toLowerCase();
    const shortName = name.replace(/\s*\d+(st|nd|rd|th)\s*gen.*$/i, '').trim();
    
    if (!verdictLower.includes(shortName) && !verdictLower.includes(name)) {
      if (prod.price > 200 || products.indexOf(prod) < 3) {
        missingInVerdict.push(prod.title);
      }
    }
    
    if (!conclusionLower.includes(shortName) && !conclusionLower.includes(name)) {
      if (prod.price > 200 || products.indexOf(prod) < 3) {
        missingInConclusion.push(prod.title);
      }
    }
  });
  
  if (missingInVerdict.length > 0 || missingInConclusion.length > 0) {
    results.push({
      id: guide.id,
      title: guide.title_en || guide.title,
      productCount: products.length,
      products: productNames,
      missingInVerdict,
      missingInConclusion,
      verdict: verdict.substring(0, 120),
      conclusion: conclusion.substring(0, 120)
    });
  }
});

console.log(`\n=== AUDITORÍA DE VEREDICTOS ===`);
console.log(`Guías analizadas: ${g.length}`);
console.log(`Guías con problemas: ${results.length}\n`);

results.forEach((r, i) => {
  console.log(`${i + 1}. ${r.id} — ${r.title} (${r.productCount} productos)`);
  if (r.missingInVerdict.length > 0) {
    console.log(`   ❌ En veredicto NO aparecen: ${r.missingInVerdict.join(', ')}`);
  }
  if (r.missingInConclusion.length > 0) {
    console.log(`   ⚠️  En conclusión NO aparecen: ${r.missingInConclusion.join(', ')}`);
  }
  console.log(`   Veredicto: "${r.verdict}..."`);
  console.log(`   Conclusión: "${r.conclusion}..."`);
  console.log('');
});
