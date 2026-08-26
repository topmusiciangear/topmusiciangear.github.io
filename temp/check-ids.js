const fs = require('fs');
const src = fs.readFileSync('./build-guides.js', 'utf8');

// Find TEST_SHOP_BTN block
const start = src.indexOf('const TEST_SHOP_BTN = {');
const endMarker = '\n};';
const end = src.indexOf(endMarker, start);
const block = src.substring(start, end + 2);

// Extract all IDs
const idMatches = [...block.matchAll(/^\s*(\d+):/gm)];
const ids = idMatches.map(m => parseInt(m[1]));
console.log('IDs in TEST_SHOP_BTN:', ids.length);
console.log('IDs:', ids.sort((a,b) => a-b).join(', '));

// Check which of our target IDs exist
const targets = [366,304,120,238,92,370,132,165,166,220,260,349,347,348,350,354,365,8,364,113,114,115];
console.log('\nTarget IDs check:');
targets.forEach(id => {
  console.log(`  ${id}: ${ids.includes(id) ? 'EXISTS' : 'MISSING'}`);
});
