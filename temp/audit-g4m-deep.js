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

function extractG4MPathName(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(p => p);
    return parts.length >= 2 ? parts[parts.length - 2] : '';
  } catch(e) { return ''; }
}

// For each product, extract model numbers from title and check if they appear in URL path
const realMismatches = [];
products.forEach(p => {
  if (!p.stores || !p.stores.gear4music) return;
  const decoded = decodeAwinUrl(p.stores.gear4music);
  const pathName = extractG4MPathName(decoded).toLowerCase();
  const titleLower = p.title.toLowerCase();
  const brandLower = (p.brand || '').toLowerCase();
  
  // Extract the "model" part of the title (after brand name)
  let modelPart = titleLower;
  if (brandLower) {
    modelPart = titleLower.replace(brandLower, '').trim();
  }
  
  // Get significant model words (numbers, model codes)
  const modelWords = modelPart.split(/[\s\-\/]+/).filter(w => w.length > 1 && !['the', 'and', 'with', 'for', 'each', 'pair', 'black', 'white', 'studio', 'professional', 'active', 'powered', 'digital', 'condenser', 'dynamic', 'microphone', 'headphones', 'monitor', 'interface', 'keyboard', 'controller', 'guitar', 'bass', 'amplifier', 'pedal', 'effect', 'multi', 'system', 'wireless', 'series', 'compact', 'portable', 'reference', 'open', 'closed', 'back', 'over', 'ear', 'in', 'ear', 'cardioid', 'supercardioid', 'omnidirectional', 'pattern', 'usb', 'xlr', 'mini', 'pro', 'ii', 'iii', 'iv', 'v', 'mk2', 'mk3', 'mk4', 'gen', '2nd', '3rd', '4th', 'new', 'version', 'updated', 'latest', '2024', '2025', '2026'].includes(w));
  
  // Check if brand appears in URL path
  const brandWords = brandLower.split(/\s+/).filter(w => w.length > 1);
  const brandInPath = brandWords.some(w => pathName.includes(w));
  
  // Check if model words appear in URL path
  const modelInPath = modelWords.filter(w => w.length > 2).some(w => pathName.includes(w));
  
  // If neither brand nor model appears in path → likely wrong product
  if (!brandInPath && !modelInPath && modelWords.length > 0) {
    // Double check: is the path name clearly a different product?
    const pathWords = pathName.split(/[\s\-]+/).filter(w => w.length > 2);
    const titleSignificantWords = titleLower.split(/[\s\-]+/).filter(w => w.length > 3 && !['headphones', 'microphone', 'monitor', 'studio', 'professional', 'dynamic', 'condenser', 'active', 'powered', 'digital', 'system', 'wireless', 'series', 'compact', 'reference', 'headphone'].includes(w));
    
    // Count how many title words appear in path
    const matchingWords = titleSignificantWords.filter(w => pathName.includes(w));
    const matchRatio = titleSignificantWords.length > 0 ? matchingWords.length / titleSignificantWords.length : 0;
    
    if (matchRatio < 0.2) {
      realMismatches.push({
        id: p.id,
        title: p.title,
        brand: p.brand,
        category: p.category,
        pathName: extractG4MPathName(decoded),
        decodedUrl: decoded,
        titleWords: titleSignificantWords.slice(0, 8),
        matchingWords,
        matchRatio: Math.round(matchRatio * 100) + '%'
      });
    }
  }
});

console.log('=== REAL GEAR4MUSIC URL MISMATCHES ===');
console.log('Total:', realMismatches.length);
realMismatches.forEach(m => {
  console.log(`\nID ${m.id} | ${m.title} (${m.brand}) [${m.category}]`);
  console.log(`  URL path: ${m.pathName}`);
  console.log(`  Title words: ${m.titleWords.join(', ')}`);
  console.log(`  Matching: ${m.matchingWords.join(', ') || 'NONE'} (${m.matchRatio})`);
  console.log(`  URL: ${m.decodedUrl}`);
});
