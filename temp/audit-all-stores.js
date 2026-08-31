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

function extractSlug(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(p => p);
    return parts[parts.length - 1] || '';
  } catch(e) { return ''; }
}

// Known critical mismatches to check for
const knownProducts = {
  'ath-m50x': 'Audio-Technica ATH-M50x',
  'ath-m40x': 'Audio-Technica ATH-M40x',
  'ath-m30x': 'Audio-Technica ATH-M30x',
  'ath-m20x': 'Audio-Technica ATH-M20x',
  'dt770': 'Beyerdynamic DT 770 Pro',
  'dt990': 'Beyerdynamic DT 990 Pro',
  'sm7b': 'Shure SM7B',
  'sm58': 'Shure SM58',
  'sm57': 'Shure SM57',
  'k371': 'AKG K371',
  'mdr-7506': 'Sony MDR-7506',
  'hs8': 'Yamaha HS8',
  'hs5': 'Yamaha HS5',
  'rokit': 'KRK Rokit',
  'scarlett': 'Focusrite Scarlett',
  'apollo': 'Universal Audio Apollo',
  'volt': 'Universal Audio Volt',
  'izotope-rx': 'iZotope RX',
  'waves-ssl': 'Waves SSL',
  'melodyne': 'Celemony Melodyne',
};

const allIssues = [];
products.forEach(p => {
  if (!p.stores) return;
  Object.entries(p.stores).forEach(([store, rawUrl]) => {
    if (!rawUrl) return;
    const decoded = decodeUrl(rawUrl);
    const slug = extractSlug(decoded).toLowerCase();
    const titleLower = p.title.toLowerCase();
    const brandLower = (p.brand || '').toLowerCase();
    
    // Check if slug contains a known product name that doesn't match the current product
    Object.entries(knownProducts).forEach(([key, knownName]) => {
      if (slug.includes(key)) {
        // Check if the current product is NOT this known product
        if (!titleLower.includes(key.replace(/-/g, ' ')) && !titleLower.includes(key.replace(/-/g, ''))) {
          // Check if the current product's brand is different
          const knownBrand = knownName.split(' ')[0].toLowerCase();
          if (!brandLower.includes(knownBrand) && !titleLower.includes(knownBrand)) {
            allIssues.push({
              id: p.id,
              title: p.title,
              brand: p.brand,
              store,
              slug: extractSlug(decoded),
              issue: `URL contains "${key}" (→ ${knownName}) but product is "${p.title}"`,
              decodedUrl: decoded
            });
          }
        }
      }
    });
  });
});

console.log('=== CRITICAL URL MISMATCHES ACROSS ALL STORES ===');
console.log('Total:', allIssues.length);
allIssues.forEach(i => {
  console.log(`\nID ${i.id} | ${i.title} (${i.brand}) | Store: ${i.store}`);
  console.log(`  ${i.issue}`);
  console.log(`  Slug: ${i.slug}`);
  console.log(`  URL: ${i.decodedUrl.substring(0, 120)}`);
});

fs.writeFileSync('temp/all-store-mismatches.json', JSON.stringify(allIssues, null, 2));
