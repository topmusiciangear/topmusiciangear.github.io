const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// 1. "and and that matters" → "and that matters"
const old1 = 'and and that matters far more than any specification in this guide';
const new1 = 'and that matters far more than any specification in this guide';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: and and → and (EN)'); } else console.log('✗ Fix 1a NOT FOUND');

// ES: "y y eso importa" o similar
const old1b = 'y y eso importa mucho más que cualquier especificación en esta guía';
const new1b = 'y eso importa mucho más que cualquier especificación en esta guía';
if (t.includes(old1b)) { t = t.split(old1b).join(new1b); console.log('✓ Fix 1b: y y → y (ES)'); } else console.log('✗ Fix 1b NOT FOUND');

// 2. "Deepest new bass here" → "Deepest bass here" (pros EN)
const old2 = '"Deepest new bass here: 65 Hz at -3 dB"';
const new2 = '"Deepest bass here: 65 Hz at -3 dB"';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 2a: Deepest new bass → Deepest bass (EN)'); } else console.log('✗ Fix 2a NOT FOUND');

// 3. Alesis ELEVATE 4 score: 9.6 → 9.2 (guide-scores.js)
const gsPath = B + 'js/guide-scores.js';
let gs = fs.readFileSync(gsPath, 'utf8');
const old3 = '"Alesis ELEVATE 4": 9.6,';
const new3 = '"Alesis ELEVATE 4": 9.2,';
if (gs.includes(old3)) {
  gs = gs.split(old3).join(new3);
  fs.writeFileSync(gsPath, gs, 'utf8');
  console.log('✓ Fix 3: Alesis ELEVATE 4 score 9.6 → 9.2');
} else console.log('✗ Fix 3 NOT FOUND');

// 4. bi-amp: "50 W (2×25 W bi-amp)" → "50 W (2×25 W, single stereo amp)"
const old4 = '50 W (2×25 W bi-amp)';
const new4 = '50 W (2×25 W, single stereo amp)';
if (t.includes(old4)) { t = t.split(old4).join(new4); console.log('✓ Fix 4a: bi-amp → single stereo amp (EN)'); } else console.log('✗ Fix 4a NOT FOUND');

const old4b = '50 W (2x25 W, Clase AB)';
// No change needed for ES (already says Clase AB)

// 5. "new" en el texto ES: "el grave más profundo que puedes encontrar nuevo con este presupuesto"
const old5 = 'el grave más profundo que puedes encontrar nuevo con este presupuesto';
const new5 = 'el grave más profundo que puedes encontrar con este presupuesto';
if (t.includes(old5)) { t = t.split(old5).join(new5); console.log('✓ Fix 5: nuevo eliminado (ES)'); } else console.log('✗ Fix 5 NOT FOUND');

// 6. "new" en el texto EN: "the deepest low end you can buy new at this budget"
const old6 = 'the deepest low end you can buy new at this budget';
const new6 = 'the deepest low end you can buy at this budget';
if (t.includes(old6)) { t = t.split(old6).join(new6); console.log('✓ Fix 6: new eliminated (EN)'); } else console.log('✗ Fix 6 NOT FOUND');

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
