const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let src = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

// G4M prices to ADD (products that don't have gear4music yet)
const g4mAdd = {
  239: '£434.00',   // Rodecaster Duo
  263: '£234.00',   // UA Volt 276
  124: '£699.00',   // Fender Player II Strat HSS
  328: '£199.00',   // Arturia MiniFuse 2 OTG
  116: '£180.00',   // JBL 305P MkII
  117: '£180.00',   // Kali LP-6 V2
  21: '£600.00',    // Adam A7V
  252: '£180.00',   // Rode PodMic USB
  292: '£89.40',    // Rode NT-USB Mini
  194: '£273.50',   // Shure MV7+
  196: '£84.80',    // AT2020
  23: '£141.25',    // DT 770 Pro
  24: '£306.00',    // HD 490 Pro
  198: '£140.50',   // ATH-M50x
  299: '£73.30',    // Sennheiser Profile
  297: '£139.25',   // Rode NT1 Signature
};

// MS prices to ADD (multiply excl VAT × 1.19 for incl VAT)
const msAdd = {
  197: '€94.96',    // Rode PodMic (€79.80 × 1.19)
  50: '€117.81',    // Shure SM58 (€99.00 × 1.19)
  196: '€109.68',   // AT2020 (€92.00 × 1.19)
  252: '€238.95',   // Rode PodMic USB (€200.80 × 1.19)
  292: '€109.00',   // Rode NT-USB Mini (€91.60 × 1.19)
  297: '€187.00',   // Rode NT1 Signature (estimated from MS UK £139)
  23: '€176.00',    // DT 770 Pro (estimated)
  198: '€177.31',   // ATH-M50x (€149 × 1.19)
};

let count = 0;

// Add G4M prices
for (const [idStr, price] of Object.entries(g4mAdd)) {
  const id = parseInt(idStr);
  const regex = new RegExp(`(\\b${id}:\\s*\\{[^}]*?)gear4music:`);
  if (regex.test(src)) { continue; } // already has it
  
  // Find entry and add gear4music before closing } of prices
  const entryRegex = new RegExp(`(\\b${id}:\\s*\\{\\s*prices:\\s*\\{)`);
  const match = src.match(entryRegex);
  if (!match) continue;
  
  const entryIdx = src.indexOf(match[0]);
  const pricesIdx = src.indexOf('prices: {', entryIdx);
  
  // Find closing } of prices
  const ob = src.indexOf('{', pricesIdx + 8);
  let bc = 1, i = ob + 1;
  while (bc > 0 && i < src.length) {
    if (src[i] === '{') bc++;
    if (src[i] === '}') bc--;
    i++;
  }
  
  const insertPos = i - 1;
  src = src.substring(0, insertPos) + `, gear4music: '${price}'` + src.substring(insertPos);
  console.log(`G4M ${id}: ${price}`);
  count++;
}

// Add MS prices
for (const [idStr, price] of Object.entries(msAdd)) {
  const id = parseInt(idStr);
  const regex = new RegExp(`(\\b${id}:\\s*\\{[^}]*?)musicstore:`);
  if (regex.test(src)) { continue; }
  
  const entryRegex = new RegExp(`(\\b${id}:\\s*\\{\\s*prices:\\s*\\{)`);
  const match = src.match(entryRegex);
  if (!match) continue;
  
  const entryIdx = src.indexOf(match[0]);
  const pricesIdx = src.indexOf('prices: {', entryIdx);
  
  const ob = src.indexOf('{', pricesIdx + 8);
  let bc = 1, i = ob + 1;
  while (bc > 0 && i < src.length) {
    if (src[i] === '{') bc++;
    if (src[i] === '}') bc--;
    i++;
  }
  
  const insertPos = i - 1;
  src = src.substring(0, insertPos) + `, musicstore: '${price}'` + src.substring(insertPos);
  console.log(`MS ${id}: ${price}`);
  count++;
}

fs.writeFileSync(path.join(root, 'build-guides.js'), src);
console.log(`\nTotal: ${count} prices added`);
