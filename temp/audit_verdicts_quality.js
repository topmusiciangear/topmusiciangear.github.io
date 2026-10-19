const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const needsRewrite = [];

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
  
  // Check if verdict is just a list of names (no real sentences)
  const sentences = verdict.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const avgSentenceLength = sentences.length > 0 ? sentences.reduce((a, s) => a + s.trim().length, 0) / sentences.length : 0;
  
  // Check if products are just listed without context
  const productNamesInVerdict = products.filter(prod => verdict.includes(prod.title)).length;
  const coverage = products.length > 0 ? productNamesInVerdict / products.length : 1;
  
  // Check if verdict has real descriptive content (not just names)
  const hasDescriptiveContent = /best|pick|winner|choose|recommend|flagship|standard|value|budget|premium/i.test(verdict);
  
  if (!hasDescriptiveContent || sentences.length < 3 || avgSentenceLength < 30) {
    needsRewrite.push({
      id: guide.id,
      title: guide.title_en || guide.title,
      productCount: products.length,
      verdictSentences: sentences.length,
      avgSentenceLength: Math.round(avgSentenceLength),
      coverage: Math.round(coverage * 100) + '%',
      verdictPreview: verdict.substring(0, 120)
    });
  }
});

console.log(`\n=== VEREDICTOS QUE NECESAN REESCRITURA ===`);
console.log(`Total: ${needsRewrite.length} guías\n`);

needsRewrite.forEach((r, i) => {
  console.log(`${i + 1}. ${r.id} — ${r.title} (${r.productCount} productos, cobertura ${r.coverage})`);
  console.log(`   Frases: ${r.verdictSentences}, Longitud media: ${r.avgSentenceLength}`);
  console.log(`   Preview: "${r.verdictPreview}..."`);
  console.log('');
});
