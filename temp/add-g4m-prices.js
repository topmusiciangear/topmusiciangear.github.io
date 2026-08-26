const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let src = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

// CONFIRMED G4M prices from websearch
const g4mPrices = {
  117: '£180.00',
  21: '£600.00',
  252: '£180.00',
  292: '£89.40',
  297: '£139.25',
  194: '£273.50',
  196: '£84.80',
  23: '£141.25',
  24: '£306.00',
  198: '£140.50',
  299: '£73.30',
};

const g4mOos = [276, 195, 330];

let count = 0;
let skipped = 0;

for (const [idStr, price] of Object.entries(g4mPrices)) {
  const id = parseInt(idStr);
  
  // Find the entry line
  const lines = src.split('\n');
  let entryLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(new RegExp(`^\\s*${id}:\\s*\\{`))) {
      entryLineIdx = i;
      break;
    }
  }
  
  if (entryLineIdx === -1) {
    console.log(`  SKIP ${id}: no entry line`);
    skipped++;
    continue;
  }
  
  // Find the full entry (may span multiple lines) - find closing }
  let entryStart = 0;
  for (let i = 0; i < entryLineIdx; i++) entryStart += lines[i].length + 1;
  
  let braceCount = 0;
  let entryEnd = entryStart;
  let foundOpen = false;
  for (let i = entryStart; i < src.length; i++) {
    if (src[i] === '{') { braceCount++; foundOpen = true; }
    if (src[i] === '}') {
      braceCount--;
      if (foundOpen && braceCount === 0) { entryEnd = i; break; }
    }
  }
  
  const entry = src.substring(entryStart, entryEnd + 1);
  
  if (entry.includes('gear4music:')) {
    console.log(`  SKIP ${id}: already has gear4music`);
    skipped++;
    continue;
  }
  
  // Find the closing } of prices object within this entry
  const pricesMatch = entry.match(/prices:\s*\{/);
  if (!pricesMatch) { skipped++; continue; }
  
  const pricesStart = entry.indexOf(pricesMatch[0]);
  const pricesOpenBrace = entry.indexOf('{', pricesStart + pricesMatch[0].length - 1);
  let pBrace = 1;
  let pricesEnd = pricesOpenBrace + 1;
  while (pBrace > 0 && pricesEnd < entry.length) {
    if (entry[pricesEnd] === '{') pBrace++;
    if (entry[pricesEnd] === '}') pBrace--;
    pricesEnd++;
  }
  // pricesEnd points to char after closing }
  const insertPos = entryStart + pricesEnd - 1;
  
  src = src.substring(0, insertPos) + `, gear4music: '${price}'` + src.substring(insertPos);
  console.log(`  ADD ${id}: gear4music ${price}`);
  count++;
}

// Handle oos
for (const id of g4mOos) {
  const lines = src.split('\n');
  let entryLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(new RegExp(`^\\s*${id}:\\s*\\{`))) {
      entryLineIdx = i;
      break;
    }
  }
  
  if (entryLineIdx === -1) { console.log(`  SKIP OOS ${id}: no entry`); skipped++; continue; }
  
  let entryStart = 0;
  for (let i = 0; i < entryLineIdx; i++) entryStart += lines[i].length + 1;
  
  let braceCount = 0;
  let entryEnd = entryStart;
  let foundOpen = false;
  for (let i = entryStart; i < src.length; i++) {
    if (src[i] === '{') { braceCount++; foundOpen = true; }
    if (src[i] === '}') {
      braceCount--;
      if (foundOpen && braceCount === 0) { entryEnd = i; break; }
    }
  }
  
  const entry = src.substring(entryStart, entryEnd + 1);
  
  if (entry.includes("'gear4music'")) {
    console.log(`  SKIP OOS ${id}: already in oos`);
    skipped++;
    continue;
  }
  
  if (entry.includes('oos:')) {
    // Add to existing oos array
    const oosLocalIdx = entry.indexOf('oos:');
    const bracketLocalIdx = entry.indexOf('[', oosLocalIdx);
    const absInsertPos = entryStart + bracketLocalIdx + 1;
    src = src.substring(0, absInsertPos) + `'gear4music', ` + src.substring(absInsertPos);
    console.log(`  ADD OOS ${id}: to existing oos`);
    count++;
  } else {
    // Add new oos before closing }
    src = src.substring(0, entryEnd) + `, oos: ['gear4music']` + src.substring(entryEnd);
    console.log(`  ADD OOS ${id}: new oos`);
    count++;
  }
}

fs.writeFileSync(path.join(root, 'build-guides.js'), src);
console.log(`\nDone: ${count} added, ${skipped} skipped`);
