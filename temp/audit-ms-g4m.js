const fs = require('fs');
const path = require('path');

// Load products
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));

// Load build-guides.js and extract TEST_SHOP_BTN
const bgSrc = fs.readFileSync(path.join(__dirname, '..', 'build-guides.js'), 'utf8');

// Extract TEST_SHOP_BTN block using balanced brace matching
const marker = 'const TEST_SHOP_BTN = {';
const startIdx = bgSrc.indexOf(marker);
if (startIdx === -1) { console.error('TEST_SHOP_BTN not found'); process.exit(1); }
const blockStart = startIdx + marker.length - 1; // position of '{'
let depth = 0;
let endIdx = -1;
for (let i = blockStart; i < bgSrc.length; i++) {
  if (bgSrc[i] === '{') depth++;
  else if (bgSrc[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
if (endIdx === -1) { console.error('Could not find end of TEST_SHOP_BTN'); process.exit(1); }
const btnSrc = bgSrc.substring(blockStart, endIdx + 1);

// Safely evaluate the object literal
// Replace any trailing commas before } to avoid syntax errors
let evalSrc = btnSrc.replace(/,\s*\}/g, '}').replace(/,\s*\]/g, ']');
const TEST_SHOP_BTN = eval('(' + evalSrc + ')');

// Validate syntax by serializing back
try {
  JSON.parse(JSON.stringify(TEST_SHOP_BTN));
  console.log('TEST_SHOP_BTN syntax: OK');
} catch(e) {
  console.error('TEST_SHOP_BTN syntax error:', e.message);
}

// Check for musicstore/gear4music keys OUTSIDE prices:{} (same level as 'prices:')
console.log('\n=== CHECK: Keys at same level as "prices" (not inside prices) ===');
let outsideCount = 0;
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  // cfg should ideally only have: prices, oos, na, urls
  const allowedKeys = new Set(['prices', 'oos', 'na', 'urls']);
  for (const key of Object.keys(cfg)) {
    if (!allowedKeys.has(key)) {
      console.log(`  ID ${id}: key "${key}" is at same level as "prices" (not inside prices{})`);
      outsideCount++;
    }
  }
}
if (outsideCount === 0) console.log('  None found - all clean.');

// Check for musicstore/gear4music outside prices specifically
console.log('\n=== CHECK: musicstore/gear4music keys OUTSIDE prices:{} ===');
let outsideStoreCount = 0;
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  for (const key of ['musicstore', 'gear4music']) {
    if (cfg[key] !== undefined) {
      console.log(`  ID ${id}: "${key}" = "${cfg[key]}" is OUTSIDE prices{} at same level as prices`);
      outsideStoreCount++;
    }
  }
}
if (outsideStoreCount === 0) console.log('  None found - all clean.');

// Find products with musicstore URL but no price
console.log('\n=== PRODUCTS WITH MUSICSTORE URL BUT NO PRICE IN TEST_SHOP_BTN ===');
let msMissing = 0;
for (const p of products) {
  const hasMsUrl = p.stores && p.stores.musicstore;
  const btnEntry = TEST_SHOP_BTN[p.id];
  const hasMsPrice = btnEntry && btnEntry.prices && btnEntry.prices.musicstore;
  if (hasMsUrl && !hasMsPrice) {
    console.log(`  ID ${p.id}: ${p.title} - has musicstore URL but NO price`);
    msMissing++;
  }
}
console.log(`  Total: ${msMissing}`);

// Find products with gear4music URL but no price
console.log('\n=== PRODUCTS WITH GEAR4MUSIC URL BUT NO PRICE IN TEST_SHOP_BTN ===');
let g4mMissing = 0;
for (const p of products) {
  const hasG4mUrl = p.stores && p.stores.gear4music;
  const btnEntry = TEST_SHOP_BTN[p.id];
  const hasG4mPrice = btnEntry && btnEntry.prices && btnEntry.prices.gear4music;
  if (hasG4mUrl && !hasG4mPrice) {
    console.log(`  ID ${p.id}: ${p.title} - has gear4music URL but NO price`);
    g4mMissing++;
  }
}
console.log(`  Total: ${g4mMissing}`);

// Suspicious prices: musicstore EUR price > 1.5x Amazon USD price
console.log('\n=== SUSPICIOUSLY WRONG MUSICSTORE PRICES (EUR > 1.5x Amazon USD) ===');
let suspiciousCount = 0;

function parsePrice(s) {
  if (!s || s === 'na') return null;
  const clean = s.replace(/[^0-9.]/g, '');
  const val = parseFloat(clean);
  return isNaN(val) ? null : val;
}

for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  if (!cfg.prices) continue;
  const msPrice = parsePrice(cfg.prices.musicstore);
  const amzPrice = parsePrice(cfg.prices.amazon || (cfg.prices.pluginboutique && cfg.category !== 'plugins' ? null : cfg.prices.pluginboutique));
  // For plugins, compare to pluginboutique
  const p = products.find(pp => pp.id === parseInt(id));
  const refPrice = p && p.category === 'plugins' ? parsePrice(cfg.prices.pluginboutique) : parsePrice(cfg.prices.amazon);

  if (msPrice && refPrice && refPrice > 0) {
    const ratio = msPrice / refPrice;
    if (ratio > 1.5) {
      console.log(`  ID ${id} (${p ? p.title : '?'}): musicstore = ${cfg.prices.musicstore}, reference = ${p && p.category === 'plugins' ? cfg.prices.pluginboutique : cfg.prices.amazon}, ratio = ${ratio.toFixed(2)}x`);
      suspiciousCount++;
    }
  }
}
console.log(`  Total suspicious: ${suspiciousCount}`);

// Also check: musicstore price > 1.5x zzounds or reverb USD (fallback if no Amazon)
console.log('\n=== SUSPICIOUSLY WRONG MUSICSTORE PRICES (EUR > 1.5x any other USD price) ===');
let suspiciousCount2 = 0;
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  if (!cfg.prices) continue;
  const msPrice = parsePrice(cfg.prices.musicstore);
  if (!msPrice) continue;

  // Collect all USD prices from this entry
  const usdPrices = [];
  for (const key of ['amazon', 'zzounds', 'reverb']) {
    const pp = parsePrice(cfg.prices[key]);
    if (pp && key !== 'reverb') usdPrices.push({ store: key, price: pp }); // reverb is approx
    else if (pp) usdPrices.push({ store: key, price: pp });
  }

  if (usdPrices.length > 0) {
    const maxUsd = Math.max(...usdPrices.map(x => x.price));
    const ratio = msPrice / maxUsd;
    if (ratio > 1.5) {
      const p = products.find(pp => pp.id === parseInt(id));
      const cheapest = usdPrices.find(x => x.price === maxUsd);
      console.log(`  ID ${id} (${p ? p.title : '?'}): musicstore = ${cfg.prices.musicstore}, max USD = ${cheapest.store} ${cheapest.store === 'reverb' ? cfg.prices.reverb : '$' + maxUsd}, ratio = ${ratio.toFixed(2)}x`);
      suspiciousCount2++;
    }
  }
}
console.log(`  Total suspicious (any USD source): ${suspiciousCount2}`);

// Summary of ALL entries with musicstore prices
console.log('\n=== ALL ENTRIES WITH MUSICSTORE PRICES ===');
for (const [id, cfg] of Object.entries(TEST_SHOP_BTN)) {
  if (cfg.prices && cfg.prices.musicstore) {
    console.log(`  ID ${id}: musicstore = ${cfg.prices.musicstore}`);
  }
}
