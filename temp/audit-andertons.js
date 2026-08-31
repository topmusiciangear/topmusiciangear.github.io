const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function extractAndertonsSlug(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(p => p);
    return parts[parts.length - 1] || '';
  } catch(e) { return ''; }
}

const andertonsIssues = [];
products.forEach(p => {
  if (!p.stores || !p.stores.andertons) return;
  const url = p.stores.andertons;
  const slug = extractAndertonsSlug(url);
  const slugLower = slug.toLowerCase();
  const titleLower = p.title.toLowerCase();
  const brandLower = (p.brand || '').toLowerCase();
  
  // Check for specific wrong product models in slug
  const titleWords = titleLower.split(/[\s\-\/]+/).filter(w => w.length > 3 && !['headphones', 'microphone', 'monitor', 'studio', 'professional', 'dynamic', 'condenser', 'active', 'powered', 'digital', 'system', 'wireless', 'series', 'compact', 'reference', 'headphone', 'speaker', 'guitar', 'bass', 'amplifier', 'amplifiers', 'pedal', 'effects', 'interface', 'keyboard', 'controller', 'mixer'].includes(w));
  
  const brandWords = brandLower.split(/\s+/).filter(w => w.length > 1);
  const brandInSlug = brandWords.some(w => slugLower.includes(w));
  const titleInSlug = titleWords.filter(w => w.length > 3).some(w => slugLower.includes(w));
  
  if (!brandInSlug && !titleInSlug && titleWords.length > 0) {
    andertonsIssues.push({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      slug,
      url,
      titleWords: titleWords.slice(0, 5)
    });
  }
});

console.log('=== ANDERTONS URL MISMATCHES ===');
console.log('Total:', andertonsIssues.length);
andertonsIssues.forEach(i => {
  console.log(`ID ${i.id} | ${i.title} (${i.brand}) [${i.category}]`);
  console.log(`  Slug: ${i.slug}`);
  console.log(`  Expected: ${i.titleWords.join(', ')}`);
});
