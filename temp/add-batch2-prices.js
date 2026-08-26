const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'build-guides.js');
let content = fs.readFileSync(FILE, 'utf8');

let added = 0;
let skipped = 0;

function addPrice(id, store, price) {
  const idStr = String(id);
  // Find the line starting with `  <id>: {`
  const lineRegex = new RegExp(`(  ${idStr}: \\{[^\\n]*)`, 'g');
  const match = lineRegex.exec(content);
  if (!match) {
    console.log(`  !! ${id}: entry NOT FOUND`);
    skipped++;
    return;
  }
  const line = match[1];
  
  // Check if store already exists as key
  if (new RegExp(`['"]?${store}['"]?:\\s*['"]`).test(line)) {
    skipped++;
    return;
  }
  
  // Check if store is in oos array
  if (new RegExp(`oos:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) {
    console.log(`  -- ${id}: ${store} is OOS`);
    skipped++;
    return;
  }
  
  // Check if store is in na array
  if (new RegExp(`na:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) {
    console.log(`  -- ${id}: ${store} is NA`);
    skipped++;
    return;
  }
  
  // Check if store has a urls entry but no prices entry
  if (new RegExp(`urls:\\s*\\{[^}]*['"]?${store}['"]?`).test(line)) {
    // Has urls but no price - add price
  }
  
  // Find the closing `} }` of the prices object and add before it
  // Pattern: prices: { ... } } or prices: { ..., store: 'val' } }
  // We want to add: , store: 'price'
  
  // Find the prices object content
  const pricesRegex = /(prices:\s*\{[^}]*)/;
  const pricesMatch = pricesRegex.exec(line);
  if (!pricesMatch) {
    console.log(`  !! ${id}: prices object not found in entry`);
    skipped++;
    return;
  }
  
  const pricesContent = pricesMatch[1];
  // Check again inside the actual prices object
  if (new RegExp(`['"]?${store}['"]?:\\s*['"]`).test(pricesContent)) {
    skipped++;
    return;
  }
  
  // Add the new price before the closing } of prices
  const newLine = line.replace(
    /(prices:\s*\{[^}]*)/,
    `$1, ${store}: '${price}'`
  );
  
  content = content.replace(line, newLine);
  added++;
  console.log(`  ++ ${id}: ${store} ${price}`);
}

// ============================================
// G4M PRICES (GBP) — verified via websearch
// ============================================
console.log('--- G4M Prices ---');
addPrice(21, 'gear4music', '£600.00');
addPrice(24, 'gear4music', '£306.00');
addPrice(50, 'gear4music', '£103.50');
addPrice(116, 'gear4music', '£180.00');
addPrice(117, 'gear4music', '£180.00');
addPrice(192, 'gear4music', '£263.00');
addPrice(194, 'gear4music', '£273.50');
addPrice(197, 'gear4music', '£64.00');
addPrice(297, 'gear4music', '£139.25');
addPrice(303, 'gear4music', '£245.00');
addPrice(305, 'gear4music', '£504.42');

// ============================================
// MS PRICES (EUR incl VAT) — verified via websearch
// ============================================
console.log('\n--- MS Prices ---');
addPrice(24, 'musicstore', '€309.00');
addPrice(50, 'musicstore', '€118.00');
addPrice(116, 'musicstore', '€155.00');
addPrice(117, 'musicstore', '€200.00');
addPrice(192, 'musicstore', '€515.00');
addPrice(194, 'musicstore', '€309.00');
addPrice(196, 'musicstore', '€108.00');
addPrice(197, 'musicstore', '€82.00');
addPrice(21, 'musicstore', '€649.00');
addPrice(297, 'musicstore', '€190.00');
addPrice(303, 'musicstore', '€291.00');
addPrice(305, 'musicstore', '€529.00');
addPrice(248, 'musicstore', '€635.00');
addPrice(239, 'musicstore', '€385.00');
addPrice(263, 'musicstore', '€279.00');
addPrice(328, 'musicstore', '€237.00');

// ============================================
// OOS on G4M — verified via websearch
// ============================================
console.log('\n--- G4M OOS ---');
function addOOS(id, store) {
  const idStr = String(id);
  const lineRegex = new RegExp(`(  ${idStr}: \\{[^\\n]*)`, 'g');
  const match = lineRegex.exec(content);
  if (!match) { skipped++; return; }
  const line = match[1];
  if (new RegExp(`oos:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) { skipped++; return; }
  if (new RegExp(`na:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) { skipped++; return; }
  if (new RegExp(`['"]?${store}['"]?:\\s*['"]`).test(line)) { skipped++; return; }
  // Add oos array
  if (/oos:\s*\[/.test(line)) {
    content = content.replace(
      new RegExp(`(  ${idStr}: \\{[^\\n]*oos:\\s*\\[)([^\\]]*)`),
      `$1$2, '${store}'`
    );
  } else {
    content = content.replace(
      new RegExp(`(  ${idStr}: \\{[^\\n]*\\})\\s*(,|\\n)`),
      `$1, oos: ['${store}']$2`
    );
  }
  added++;
  console.log(`  ++ ${id}: ${store} OOS`);
}

addOOS(276, 'gear4music');
addOOS(195, 'gear4music');
addOOS(330, 'gear4music');

// ============================================
// Fix trailing comma before };
// ============================================
content = content.replace(/,(\s*\}\s*\};)/g, '$1');

fs.writeFileSync(FILE, content, 'utf8');
console.log(`\n=== DONE ===`);
console.log(`Added: ${added}, Skipped: ${skipped}`);
