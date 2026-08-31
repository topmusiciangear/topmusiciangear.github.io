const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function decodeAwinUrl(awinUrl) {
  try {
    const parsed = new URL(awinUrl);
    const ued = parsed.searchParams.get('ued');
    if (ued) return decodeURIComponent(ued);
  } catch(e) {}
  return awinUrl;
}

function extractG4MSlug(u) {
  try {
    const parsed = new URL(u);
    const path = parsed.pathname;
    const parts = path.split('/').filter(p => p);
    return parts[parts.length - 1] || '';
  } catch(e) { return ''; }
}

// Check ALL gear4music URLs
const g4mIssues = [];
products.forEach(p => {
  if (!p.stores || !p.stores.gear4music) return;
  const rawUrl = p.stores.gear4music;
  const decoded = decodeAwinUrl(rawUrl);
  const slug = extractG4MSlug(decoded);
  
  // Extract product keywords from title
  const titleLower = p.title.toLowerCase();
  const brandLower = (p.brand || '').toLowerCase();
  const slugLower = slug.toLowerCase();
  
  // Check if brand appears in slug
  const brandWords = brandLower.split(/\s+/).filter(w => w.length > 1);
  const brandInSlug = brandWords.some(w => slugLower.includes(w));
  
  // Extract model numbers from title (things like ATH-M50x, HS8, SM7B, etc.)
  const modelPatterns = titleLower.match(/[a-z0-9]+[\-][a-z0-9]+/gi) || [];
  const titleWords = titleLower.split(/[\s\-\/]+/).filter(w => w.length > 2);
  
  // Check if any significant title word appears in slug
  const significantWords = titleWords.filter(w => w.length > 3 && !['the', 'and', 'with', 'for', 'each', 'pair', 'black', 'white', 'studio', 'professional', 'active', 'powered'].includes(w));
  const wordsInSlug = significantWords.filter(w => slugLower.includes(w));
  
  // If brand is NOT in slug AND no significant words match → likely mismatch
  if (!brandInSlug && wordsInSlug.length === 0 && significantWords.length > 0) {
    g4mIssues.push({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      decodedUrl: decoded,
      slug,
      missingBrand: !brandInSlug,
      matchingWords: wordsInSlug,
      expectedWords: significantWords.slice(0, 5)
    });
  }
});

console.log('=== GEAR4MUSIC URL MISMATCHES (brand not in slug) ===');
console.log('Total potential mismatches:', g4mIssues.length);
g4mIssues.forEach(i => {
  console.log(`\nID ${i.id} | ${i.title} (${i.brand}) [${i.category}]`);
  console.log(`  Slug: ${i.slug}`);
  console.log(`  Decoded URL: ${i.decodedUrl}`);
  console.log(`  Expected brand words: ${i.expectedWords.join(', ')}`);
});

fs.writeFileSync('temp/g4m-mismatches.json', JSON.stringify(g4mIssues, null, 2));
