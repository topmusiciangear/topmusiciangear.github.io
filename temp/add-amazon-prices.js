const fs = require('fs');
const buildPath = './build-guides.js';
let src = fs.readFileSync(buildPath, 'utf8');

const additions = [
  [304, 'amazon', '$599.00'],
  [120, 'amazon', '$119.00'],
  [238, 'amazon', '$99.00'],
  [92, 'amazon', '$849.00'],
  [132, 'amazon', '$949.99'],
  [165, 'amazon', '$599.00'],
  [166, 'amazon', '$399.00'],
  [220, 'amazon', '$949.00'],
  [349, 'amazon', '$1,090.00'],
  [347, 'amazon', '$199.99'],
  [348, 'amazon', '$479.99'],
  [350, 'amazon', '$228.99'],
  [354, 'amazon', '$599.00'],
  [115, 'amazon', '$399.00'],
  [350, 'andertons', '£189.00'],
];

let changes = 0;

additions.forEach(([id, store, price]) => {
  // Find the entry start
  const entryPattern = new RegExp('(^\\s*' + id + ':\\s*\\{)', 'm');
  const entryMatch = src.match(entryPattern);
  if (!entryMatch) { console.log(`${id}: NOT FOUND`); return; }

  const entryStart = entryMatch.index;

  // Find the full entry (matching braces)
  let braceCount = 0;
  let i = entryStart;
  let started = false;
  while (i < src.length) {
    if (src[i] === '{') { braceCount++; started = true; }
    if (src[i] === '}') {
      braceCount--;
      if (started && braceCount === 0) break;
    }
    i++;
  }
  const entryEnd = i + 1;
  const entry = src.substring(entryStart, entryEnd);

  // Find "prices:" keyword
  const pricesIdx = entry.indexOf('prices:');
  if (pricesIdx === -1) {
    console.log(`${id}: no prices object`);
    return;
  }

  // Find the opening { of prices object (after "prices:")
  const pricesObjStart = entry.indexOf('{', pricesIdx + 7);
  if (pricesObjStart === -1) return;

  // Find matching closing } for prices object
  let pBraceCount = 0;
  let j = pricesObjStart;
  let pStarted = false;
  while (j < entry.length) {
    if (entry[j] === '{') { pBraceCount++; pStarted = true; }
    if (entry[j] === '}') {
      pBraceCount--;
      if (pStarted && pBraceCount === 0) break;
    }
    j++;
  }
  const pricesObjEnd = j;

  // Check if store already exists in prices
  const pricesContent = entry.substring(pricesObjStart, pricesObjEnd + 1);
  if (pricesContent.includes(store + ':') || pricesContent.includes(store + ' :')) {
    console.log(`${id}: already has ${store} in prices`);
    return;
  }

  // Insert before the closing } of prices object
  const insertPos = entryStart + pricesObjEnd;
  const insertion = `, ${store}: '${price}'`;
  src = src.substring(0, insertPos) + insertion + src.substring(insertPos);
  changes++;
  console.log(`Added ${store} ${price} to id ${id} (inside prices)`);
});

console.log(`\nTotal changes: ${changes}`);
fs.writeFileSync(buildPath, src);
