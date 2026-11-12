const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// Fix: Kevlar-coated woofer → white cone woofer (HS8 context)
const old1 = 'Its 8-inch Kevlar-coated woofer digs genuinely deep';
const new1 = 'Its 8-inch white cone woofer digs genuinely deep';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: Kevlar-coated → white cone (HS8)'); } else console.log('✗ Fix 1a NOT FOUND');

const old2 = 'The 8-inch Kevlar-coated woofer stays tight and con';
const new2 = 'The 8-inch white cone woofer stays tight and con';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 1b: Kevlar-coated → white cone (HS8)'); } else console.log('✗ Fix 1b NOT FOUND');

// Fix: "and and" → "and" in CR4.5 section
const old3 = 'and and that matters far more than any specification in this guide';
const new3 = 'and that matters far more than any specification in this guide';
if (t.includes(old3)) { t = t.split(old3).join(new3); console.log('✓ Fix 2: and and → and (CR4.5)'); } else console.log('✗ Fix 2 NOT FOUND');

// Fix: "Deepest new bass here" → "Deepest bass here" (CR4.5 pros)
const old4 = '"Deepest new bass here: 65 Hz at -3 dB"';
const new4 = '"Deepest bass here: 65 Hz at -3 dB"';
if (t.includes(old4)) { t = t.split(old4).join(new4); console.log('✓ Fix 3: Deepest new bass → Deepest bass (CR4.5 pros)'); } else console.log('✗ Fix 3 NOT FOUND');

// Fix: "new" in ES text
const old5 = 'el grave más profundo que puedes encontrar nuevo con este presupuesto';
const new5 = 'el grave más profundo que puedes encontrar con este presupuesto';
if (t.includes(old5)) { t = t.split(old5).join(new5); console.log('✓ Fix 4: nuevo eliminado (ES)'); } else console.log('✗ Fix 4 NOT FOUND');

// Fix: "new" in EN text
const old6 = 'the deepest low end you can buy new at this budget';
const new6 = 'the deepest low end you can buy at this budget';
if (t.includes(old6)) { t = t.split(old6).join(new6); console.log('✓ Fix 5: new eliminated (EN)'); } else console.log('✗ Fix 5 NOT FOUND');

// Fix: bi-amp → single stereo amp
const old7 = '50 W (2×25 W bi-amp)';
const new7 = '50 W (2×25 W, single stereo amp)';
if (t.includes(old7)) { t = t.split(old7).join(new7); console.log('✓ Fix 6: bi-amp → single stereo amp (EN)'); } else console.log('✗ Fix 6 NOT FOUND');

// Fix: bi-amplificado en ES
const old8 = '50 W (2x25 W, Clase AB)';
// No change needed, already correct

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
