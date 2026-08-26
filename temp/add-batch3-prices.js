const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'build-guides.js');
let content = fs.readFileSync(FILE, 'utf8');

let added = 0;
let skipped = 0;

function addPrice(id, store, price) {
  const idStr = String(id);
  // Find the specific entry line
  const regex = new RegExp(`(  ${idStr}: \\{.*)`);
  const match = content.match(regex);
  if (!match) { console.log(`!! ${id}: NOT FOUND`); skipped++; return; }
  
  const fullLine = match[0];
  
  // Check if store already exists in this entry
  if (new RegExp(`['"]?${store}['"]?:\\s*['"$]`).test(fullLine)) {
    skipped++;
    return;
  }
  
  // Find the closing `}` of prices object
  // Simple approach: find `} }` or `} ,` or `},` at end of entry
  // For single-line entries: find `} }` pattern
  // For multi-line entries: find the closing on the last line
  
  // Check if entry is single-line (contains `} }` or `},` or `}` at end)
  if (fullLine.includes('} }') || fullLine.endsWith('},') || fullLine.endsWith('} },')) {
    // Single-line entry - add price before first `}`
    const updated = fullLine.replace(
      /(\}\s*\})/,
      `, ${store}: '${price}' $1`
    );
    content = content.replace(fullLine, updated);
    added++;
    console.log(`++ ${id}: ${store} ${price}`);
  } else {
    // Multi-line entry - find the line that closes the prices object
    // Look for the pattern on the same line as the entry
    const lines = content.split('\n');
    const startIdx = lines.findIndex(l => l.trim().startsWith(idStr + ':'));
    if (startIdx === -1) { skipped++; return; }
    
    // Find the closing line (contains `}` and ends with `,` or `}`)
    let endIdx = startIdx;
    let depth = 0;
    for (let i = startIdx; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth <= 0) { endIdx = i; break; }
    }
    
    // Add price before the last closing brace on endIdx
    const closingLine = lines[endIdx];
    const updatedClosing = closingLine.replace(
      /(\}\s*\})/,
      `, ${store}: '${price}' $1`
    );
    lines[endIdx] = updatedClosing;
    content = lines.join('\n');
    added++;
    console.log(`++ ${id}: ${store} ${price} (multiline)`);
  }
}

// ============================================
// G4M PRICES (GBP)
// ============================================
console.log('--- G4M ---');
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
// MS PRICES (EUR)
// ============================================
console.log('\n--- MS ---');
addPrice(21, 'musicstore', '€649.00');
addPrice(24, 'musicstore', '€309.00');
addPrice(50, 'musicstore', '€118.00');
addPrice(116, 'musicstore', '€155.00');
addPrice(117, 'musicstore', '€200.00');
addPrice(192, 'musicstore', '€515.00');
addPrice(194, 'musicstore', '€309.00');
addPrice(196, 'musicstore', '€108.00');
addPrice(197, 'musicstore', '€82.00');
addPrice(297, 'musicstore', '€190.00');
addPrice(303, 'musicstore', '€522.00');
addPrice(305, 'musicstore', '€529.00');
addPrice(248, 'musicstore', '€635.00');
addPrice(263, 'musicstore', '€279.00');
addPrice(328, 'musicstore', '€237.00');

// ============================================
// G4M OOS
// ============================================
console.log('\n--- G4M OOS ---');
function addOOS(id, store) {
  const idStr = String(id);
  const regex = new RegExp(`(  ${idStr}: \\{[^\\n]*)`);
  const match = content.match(regex);
  if (!match) { skipped++; return; }
  const line = match[0];
  if (new RegExp(`oos:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) { skipped++; return; }
  if (new RegExp(`na:\\s*\\[[^\\]]*['"]?${store}['"]?`).test(line)) { skipped++; return; }
  if (new RegExp(`['"]?${store}['"]?:\\s*['"$]`).test(line)) { skipped++; return; }
  
  // Add oos after closing } of prices
  content = content.replace(
    new RegExp(`(  ${idStr}: \\{[^\\n]*?\\})`),
    `$1, oos: ['${store}']`
  );
  added++;
  console.log(`++ ${id}: ${store} OOS`);
}

addOOS(276, 'gear4music');
addOOS(195, 'gear4music');
addOOS(330, 'gear4music');

// Clean trailing commas
content = content.replace(/,(\s*\}\s*\};)/g, '$1');

fs.writeFileSync(FILE, content, 'utf8');
console.log(`\n=== DONE: ${added} added, ${skipped} skipped ===`);
