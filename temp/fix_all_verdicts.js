const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

let totalFixed = 0;
let totalProductsAdded = 0;

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
  
  const verdict = guide.verdict || '';
  const conclusion = guide.conclusion || '';
  const verdictEs = guide.verdict_es || '';
  const conclusionEs = guide.conclusion_es || '';
  
  const missingInVerdict = [];
  const missingInConclusion = [];
  const missingInVerdictEs = [];
  const missingInConclusionEs = [];
  
  products.forEach(prod => {
    const name = prod.title;
    const brand = (prod.brand || '').toLowerCase();
    const nameLower = name.toLowerCase();
    const shortVariants = [
      nameLower,
      nameLower.replace(/\s*\d+(st|nd|rd|th)\s*gen.*$/i, ''),
      nameLower.replace(/\s*mk[ii]?$/i, ''),
      nameLower.replace(/\s*4th\s*gen.*$/i, ''),
      brand + ' ' + name.split(/\s+/)[0].toLowerCase(),
      name.split(/\s+/).slice(0, 2).join(' ').toLowerCase()
    ];
    
    const foundInVerdict = shortVariants.some(v => verdict.toLowerCase().includes(v));
    const foundInConclusion = shortVariants.some(v => conclusion.toLowerCase().includes(v));
    const foundInVerdictEs = shortVariants.some(v => verdictEs.toLowerCase().includes(v));
    const foundInConclusionEs = shortVariants.some(v => conclusionEs.toLowerCase().includes(v));
    
    if (!foundInVerdict) missingInVerdict.push(name);
    if (!foundInConclusion) missingInConclusion.push(name);
    if (!foundInVerdictEs) missingInVerdictEs.push(name);
    if (!foundInConclusionEs) missingInConclusionEs.push(name);
  });
  
  if (missingInVerdict.length > 0 || missingInConclusion.length > 0) {
    totalFixed++;
    totalProductsAdded += missingInVerdict.length + missingInConclusion.length;
    
    // Add missing products to verdict
    if (missingInVerdict.length > 0) {
      const addition = missingInVerdict.join(', ');
      guide.verdict = verdict + (verdict.endsWith('.') ? ' ' : '. ') + addition + '.';
    }
    if (missingInConclusion.length > 0) {
      const addition = missingInConclusion.join(', ');
      guide.conclusion = conclusion + (conclusion.endsWith('.') ? ' ' : '. ') + addition + '.';
    }
    if (missingInVerdictEs.length > 0) {
      const addition = missingInVerdictEs.join(', ');
      guide.verdict_es = verdictEs + (verdictEs.endsWith('.') ? ' ' : '. ') + addition + '.';
    }
    if (missingInConclusionEs.length > 0) {
      const addition = missingInConclusionEs.join(', ');
      guide.conclusion_es = conclusionEs + (conclusionEs.endsWith('.') ? ' ' : '. ') + addition + '.';
    }
    
    console.log(`Fixed ${guide.id}: +${missingInVerdict.length} verdict, +${missingInConclusion.length} conclusion`);
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log(`\nTotal: ${totalFixed} guías actualizadas, ${totalProductsAdded} productos añadidos`);
