const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const missingIds = [32,34,61,115,118,161,162,163,164,170,177,222,246,251,253,261,264,265,268,270,277,278,279,284,286,289,290,293,295,300,309,317,326,327,329,335,344,350,352,357,360,373,374,376,378,379,380,382,385,387,388,389,390,391,392,393,394,411,419,420,421,422,423,424,425,426,427,428,432,433,436,437,439,450];

// Map TEST_SHOP_BTN IDs to products.json keys (internal_id -> key)
const idToKey = {};
for (const [key, p] of Object.entries(products)) {
  if (p.id != null) idToKey[p.id] = parseInt(key);
}

const withUrl = [];
const withoutUrl = [];

for (const btnId of missingIds) {
  const key = idToKey[btnId];
  if (key === undefined) {
    withoutUrl.push({ btnId, title: 'UNKNOWN', hasUrl: false });
    continue;
  }
  const p = products[String(key)];
  const hasMs = p.stores && p.stores.musicstore;
  const url = hasMs ? (p.stores.musicstore.url || p.stores.musicstore) : null;
  
  if (url) {
    // Extract slug
    let slug = null;
    let match = url.match(/musicstore\.com%2Fen_OE%2FEUR%2F([^&]+)/);
    if (!match) match = url.match(/musicstore\.com\/en_OE\/EUR\/([^/?]+)/);
    if (!match) match = url.match(/musicstore\.com%2Fen_OT%2FEUR%2F([^&]+)/);
    if (!match) match = url.match(/musicstore\.com\/en_OT\/EUR\/([^/?]+)/);
    if (match) slug = decodeURIComponent(match[1]);
    
    withUrl.push({ btnId, key, title: p.title || p.desc?.substring(0, 40) || '?', slug: slug || 'PARSE_ERROR', artCode: slug?.match(/art-([A-Z0-9-]+)/)?.[1] || null });
  } else {
    withoutUrl.push({ btnId, key, title: p.title || p.desc?.substring(0, 40) || '?', hasUrl: false });
  }
}

console.log('With Music Store URL:', withUrl.length);
console.log('Without Music Store URL:', withoutUrl.length);
console.log('\n--- WITH URL (need price) ---');
withUrl.forEach(p => console.log('BTN:' + p.btnId + ' | Key:' + p.key + ' | ' + p.title?.substring(0, 35) + ' | art:' + (p.artCode || 'none')));
console.log('\n--- WITHOUT URL ---');
withoutUrl.forEach(p => console.log('BTN:' + p.btnId + ' | Key:' + (p.key || '?') + ' | ' + (p.title || '?').substring(0, 35)));
