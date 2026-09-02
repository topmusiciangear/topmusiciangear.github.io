const fs = require('fs');

// Load v2 scraped prices (accurate)
const all = [];
for (let i = 0; i < 169; i += 50) {
  const end = Math.min(i + 50, 169);
  const file = 'temp/ms-prices-v2-' + i + '-' + end + '.json';
  if (fs.existsSync(file)) {
    all.push(...JSON.parse(fs.readFileSync(file, 'utf8')));
  }
}
const found = all.filter(p => p.price);
console.log('V2 scraped prices loaded:', found.length);

// Build map: slug -> price
const slugToPrice = {};
for (const item of found) {
  slugToPrice[item.slug] = item.price;
}

// Load products.json to get MS URLs with art codes
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Build map: art-code -> scraped price
const artToPrice = {};
for (const [id, p] of Object.entries(products)) {
  if (p.stores && p.stores.musicstore) {
    let url = p.stores.musicstore.url || p.stores.musicstore;
    // Extract art code from URL
    let artMatch = url.match(/art-([A-Z0-9]+)/);
    if (!artMatch) {
      // Try URL-encoded format
      artMatch = url.match(/art-([A-Z0-9-]+)/);
    }
    if (artMatch) {
      const artCode = artMatch[1];
      // Try to find this product in scraped data
      const slug = Object.keys(slugToPrice).find(s => s.includes(artCode));
      if (slug) {
        artToPrice[artCode] = slugToPrice[slug];
      }
    }
  }
}

console.log('Art codes mapped:', Object.keys(artToPrice).length);

// Read build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');
const startMarker = 'const TEST_SHOP_BTN = {';
const endMarker = '};';
const startIdx = bg.indexOf(startMarker);
const endIdx = bg.indexOf(endMarker, startIdx + startMarker.length);
const block = bg.substring(startIdx, endIdx + endMarker.length);

// Parse each line and find art codes in URLs
const lines = block.split('\n');
const updated = [];
let updatedCount = 0;

for (const line of lines) {
  const idMatch = line.match(/^\s*(\d+):\s*\{/);
  if (idMatch) {
    const btnId = parseInt(idMatch[1]);
    
    // Find art code in urls section of this line
    const artMatch = line.match(/art-([A-Z0-9-]+)/);
    if (artMatch) {
      const artCode = artMatch[1];
      const scrapedPrice = artToPrice[artCode];
      
      if (scrapedPrice !== undefined) {
        // Format price
        const numPrice = parseFloat(scrapedPrice.replace(/[, ]/g, ''));
        const formatted = 'EUR' + numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        // Replace musicstore price
        const newLine = line.replace(
          /musicstore:"EUR[\d,.]+"/,
          'musicstore:"' + formatted + '"'
        );
        
        if (newLine !== line) {
          const oldMatch = line.match(/musicstore:"([^"]+)"/);
          const oldPrice = oldMatch ? oldMatch[1] : 'none';
          if (oldPrice !== formatted) {
            console.log('ID:' + btnId + ' art-' + artCode + ': ' + oldPrice + ' -> ' + formatted);
            updated.push(newLine);
            updatedCount++;
            continue;
          }
        }
      }
    }
  }
  updated.push(line);
}

console.log('\nTotal updated:', updatedCount);

// Write updated file
const newBlock = updated.join('\n');
const newBg = bg.substring(0, startIdx) + newBlock + bg.substring(endIdx + endMarker.length);
fs.writeFileSync('build-guides.js', newBg, 'utf8');
console.log('build-guides.js updated');
