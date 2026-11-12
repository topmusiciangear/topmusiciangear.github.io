const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// Fix id 102 → 314 (Yamaha FGX800C) in beginner-guitar sections
// Section 0: products [102, 68, 459, 103, 310, 458, 295]
const old1 = '"products": [\n  102,\n  68,\n  459,\n  103,\n  310,\n  458,\n  295\n]';
const new1 = '"products": [\n  314,\n  68,\n  459,\n  103,\n  310,\n  458,\n  295\n]';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: beginner-guitar section 0 id 102 → 314'); } else console.log('✗ Fix 1a NOT FOUND');

// Section 2: products [313, 102, 310]
const old2 = '"products": [313, 102, 310]';
const new2 = '"products": [313, 314, 310]';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 1b: beginner-guitar section 2 id 102 → 314'); } else console.log('✗ Fix 1b NOT FOUND');

// Section 8: products [102]
const old3 = '"products": [\n  102\n]';
const new3 = '"products": [\n  314\n]';
if (t.includes(old3)) { t = t.split(old3).join(new3); console.log('✓ Fix 1c: beginner-guitar section 8 id 102 → 314'); } else console.log('✗ Fix 1c NOT FOUND');

// Fix id 102 → 314 in best-acoustic-guitars-for-beginners section 1
const old4 = '"products": [\n  102\n]';
// Already handled above if it was the same format

// Fix id 100 → 97 in best-reverb-delay (featuredProducts)
const old5 = '"featuredProducts": [\n  135,\n  97,\n  100,\n  591,\n  592,\n  593,\n  594,\n  595,\n  597,\n  596,\n  599,\n  598\n]';
const new5 = '"featuredProducts": [\n  135,\n  97,\n  97,\n  591,\n  592,\n  593,\n  594,\n  595,\n  597,\n  596,\n  599,\n  598\n]';
if (t.includes(old5)) { t = t.split(old5).join(new5); console.log('✓ Fix 2: best-reverb-delay featuredProducts id 100 → 97'); } else console.log('✗ Fix 2 NOT FOUND');

// Fix id 100 → 97 in guitar-pedals (featuredProducts)
const old6 = '"featuredProducts": [\n  135,\n  97,\n  100,\n  96,\n  99,\n  443\n]';
const new6 = '"featuredProducts": [\n  135,\n  97,\n  97,\n  96,\n  96,\n  443\n]';
if (t.includes(old6)) { t = t.split(old6).join(new6); console.log('✓ Fix 3: guitar-pedals featuredProducts id 100 → 97, id 99 → 96'); } else console.log('✗ Fix 3 NOT FOUND');

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
