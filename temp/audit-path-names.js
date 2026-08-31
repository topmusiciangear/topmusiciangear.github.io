const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function decodeUrl(url) {
  try {
    const parsed = new URL(url);
    const ued = parsed.searchParams.get('ued');
    if (ued) return decodeURIComponent(ued);
  } catch(e) {}
  return url;
}

function extractPathName(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(p => p);
    return parts.length >= 2 ? parts[parts.length - 2] : (parts[0] || '');
  } catch(e) { return ''; }
}

const criticalKeywords = [
  'ath-m50x', 'ath-m40x', 'ath-m30x', 'ath-m20x',
  'dt770', 'dt990', 'sm7b', 'sm58', 'sm57',
  'k371', 'mdr-7506', 'hs8', 'hs5', 'rokit',
  'scarlett', 'apollo', 'volt', 'izotope-rx',
  'waves-ssl', 'melodyne', 'u87', 'c414',
  'at2020', 'at2035', 'nt1', 'podmic',
  'minilogue', 'prophet', 'digitakt', 'octatrack',
  'helix', 'katana', 'thr10', 'spark-2',
];

const allIssues = [];
products.forEach(p => {
  if (!p.stores) return;
  Object.entries(p.stores).forEach(([store, rawUrl]) => {
    if (!rawUrl) return;
    const decoded = decodeUrl(rawUrl);
    const pathName = extractPathName(decoded).toLowerCase();
    const titleLower = p.title.toLowerCase();
    const brandLower = (p.brand || '').toLowerCase();
    
    criticalKeywords.forEach(keyword => {
      if (pathName.includes(keyword)) {
        // Check if this keyword matches the product
        const kwNoDash = keyword.replace(/-/g, ' ');
        const kwNoDash2 = keyword.replace(/-/g, '');
        
        if (!titleLower.includes(kwNoDash) && !titleLower.includes(kwNoDash2) && !titleLower.includes(keyword)) {
          // Doesn't match - check if brand is different too
          const knownBrands = {
            'ath-m50x': 'audio-technica', 'ath-m40x': 'audio-technica', 
            'ath-m30x': 'audio-technica', 'ath-m20x': 'audio-technica',
            'dt770': 'beyerdynamic', 'dt990': 'beyerdynamic',
            'sm7b': 'shure', 'sm58': 'shure', 'sm57': 'shure',
            'k371': 'akg', 'mdr-7506': 'sony', 'mdr7506': 'sony',
            'hs8': 'yamaha', 'hs5': 'yamaha',
            'rokit': 'krk', 'scarlett': 'focusrite',
            'apollo': 'universal', 'volt': 'universal',
            'izotope-rx': 'izotope', 'waves-ssl': 'waves',
            'melodyne': 'celemony', 'u87': 'neumann', 'c414': 'akg',
            'at2020': 'audio-technica', 'at2035': 'audio-technica',
            'nt1': 'rode', 'podmic': 'rode',
            'minilogue': 'korg', 'prophet': 'sequential',
            'digitakt': 'elektron', 'octatrack': 'elektron',
            'helix': 'line 6', 'katana': 'boss',
            'thr10': 'yamaha', 'spark-2': 'positive grid',
          };
          
          const expectedBrand = knownBrands[keyword] || '';
          if (expectedBrand && !brandLower.includes(expectedBrand) && !titleLower.includes(expectedBrand)) {
            allIssues.push({
              id: p.id,
              title: p.title,
              brand: p.brand,
              store,
              pathName: extractPathName(decoded),
              issue: `URL path contains "${keyword}" (→ ${expectedBrand}) but product is "${p.title}"`,
              decodedUrl: decoded
            });
          }
        }
      }
    });
  });
});

console.log('=== CRITICAL PATH NAME MISMATCHES ===');
console.log('Total:', allIssues.length);
allIssues.forEach(i => {
  console.log(`\nID ${i.id} | ${i.title} (${i.brand}) | Store: ${i.store}`);
  console.log(`  ${i.issue}`);
  console.log(`  Path: ${i.pathName}`);
  console.log(`  URL: ${i.decodedUrl.substring(0, 150)}`);
});

fs.writeFileSync('temp/path-mismatches.json', JSON.stringify(allIssues, null, 2));
