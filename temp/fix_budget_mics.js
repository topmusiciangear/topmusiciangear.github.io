const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// === 1. e935: supercardioid → cardioid ===
// Pros
const old1 = '"High-output supercardioid engineered to cut through dense mixes"';
const new1 = '"High-output cardioid engineered to cut through dense mixes"';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: e935 pros supercardioid → cardioid'); } else console.log('✗ Fix 1a NOT FOUND');

// Pros ES
const old1b = '"Supercardioide de alta salida diseñado para cortar mezclas densas"';
const new1b = '"Cardioide de alta salida diseñado para cortar mezclas densas"';
if (t.includes(old1b)) { t = t.split(old1b).join(new1b); console.log('✓ Fix 1b: e935 pros_es supercardioid → cardioid'); } else console.log('✗ Fix 1b NOT FOUND');

// Cons
const old1c = '"Supercardioid pattern — not as wide as cardioid alternatives"';
const new1c = '"Fixed cardioid pattern — less rear isolation than supercardioid models like the e945"';
if (t.includes(old1c)) { t = t.split(old1c).join(new1c); console.log('✓ Fix 1c: e935 cons supercardioid → fixed cardioid'); } else console.log('✗ Fix 1c NOT FOUND');

// Cons ES
const old1d = '"Patrón supercardioide — no tan amplio como alternativas cardioides"';
const new1d = '"Patrón cardioide fijo — menos aislamiento trasero que modelos supercardioides como el e945"';
if (t.includes(old1d)) { t = t.split(old1d).join(new1d); console.log('✓ Fix 1d: e935 cons_es supercardioid → fixed cardioid'); } else console.log('✗ Fix 1d NOT FOUND');

// Tabla comparativa: Supercardioid → Cardioid
const old1e = '"Supercardioid"';
const new1e = '"Cardioid"';
if (t.includes(old1e)) { t = t.split(old1e).join(new1e); console.log('✓ Fix 1e: tabla Supercardioid → Cardioid'); } else console.log('✗ Fix 1e NOT FOUND');

// Tabla comparativa ES: Supercardioide → Cardioide
const old1f = '"Supercardioide"';
const new1f = '"Cardioide"';
if (t.includes(old1f)) { t = t.split(old1f).join(new1f); console.log('✓ Fix 1f: tabla Supercardioide → Cardioide'); } else console.log('✗ Fix 1f NOT FOUND');

// === 2. Lewitt LCT 240 PRO ===
// Verdict: small-diaphragm condenser → large-diaphragm condenser
const old2 = 'A small-diaphragm condenser with almost no self-noise is a different tool from a l';
const new2 = 'A large-diaphragm condenser with almost no self-noise is a different tool from a l';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 2a: Lewitt verdict small-diaphragm → large-diaphragm'); } else console.log('✗ Fix 2a NOT FOUND');

// Pros: reemplazar "Filtro high-pass 80Hz conmutable y pad -10 dB" por "Includes mount, windscreen, and protective bag out of the box"
const old2b = '"Filtro high-pass 80Hz conmutable y pad -10 dB"';
const new2b = '"Incluye soporte, paravientos y bolsa protectora de serie"';
if (t.includes(old2b)) { t = t.split(old2b).join(new2b); console.log('✓ Fix 2b: Lewitt pros_es high-pass → includes mount'); } else console.log('✗ Fix 2b NOT FOUND');

// Pros EN: reemplazar "Switchable 80Hz high-pass filter and -10 dB pad"
const old2c = '"Switchable 80Hz high-pass filter and -10 dB pad"';
const new2c = '"Includes mount, windscreen, and protective bag out of the box"';
if (t.includes(old2c)) { t = t.split(old2c).join(new2c); console.log('✓ Fix 2c: Lewitt pros high-pass → includes mount'); } else console.log('✗ Fix 2c NOT FOUND');

// Cons: "No included accessories" → "No built-in pad or low-cut switches on the mic body"
const old2d = '"No included accessories"';
const new2d = '"No built-in pad or low-cut switches on the mic body"';
if (t.includes(old2d)) { t = t.split(old2d).join(new2d); console.log('✓ Fix 2d: Lewitt cons no accessories → no built-in pad'); } else console.log('✗ Fix 2d NOT FOUND');

// Cons ES: "Sin accesorios incluidos" → "Sin pad ni filtro low-cut integrados en el cuerpo del micrófono"
const old2e = '"Sin accesorios incluidos"';
const new2e = '"Sin pad ni filtro low-cut integrados en el cuerpo del micrófono"';
if (t.includes(old2e)) { t = t.split(old2e).join(new2e); console.log('✓ Fix 2e: Lewitt cons_es no accessories → no built-in pad'); } else console.log('✗ Fix 2e NOT FOUND');

// === 3. FAQ: under $100 → under $200 ===
const old3 = 'What is the best budget XLR microphone under $100?';
const new3 = 'What is the best budget XLR microphone under $200?';
if (t.includes(old3)) { t = t.split(old3).join(new3); console.log('✓ Fix 3a: FAQ EN $100 → $200'); } else console.log('✗ Fix 3a NOT FOUND');

const old3b = '¿Cuál es el mejor micrófono XLR económico por menos de $100?';
const new3b = '¿Cuál es el mejor micrófono XLR económico por menos de $200?';
if (t.includes(old3b)) { t = t.split(old3b).join(new3b); console.log('✓ Fix 3b: FAQ ES $100 → $200'); } else console.log('✗ Fix 3b NOT FOUND');

// === 4. Shure SM58: Score 8.9 → 9.4 ===
// Buscar en el JSON del guide budget-mics, en verdictProsCons, el Shure SM58
// El score está en el JSON como "score": 8.9 cerca de "Shure SM58"
// Voy a buscar el patrón específico
const old4 = '"name": "Shure SM58",\n        "name_es": "Shure SM58",\n        "score": 8.9';
const new4 = '"name": "Shure SM58",\n        "name_es": "Shure SM58",\n        "score": 9.4';
if (t.includes(old4)) { t = t.split(old4).join(new4); console.log('✓ Fix 4a: SM58 score 8.9 → 9.4 (verdictProsCons)'); } else console.log('✗ Fix 4a NOT FOUND');

// También en la sección final "What Products Are in This Guide?"
// Buscar el score en el featuredSnippet o en la tabla de productos
const old4b = '"score": 8.9';
// Verificar si hay otros 8.9 en budget-mics
let count89 = 0;
let searchFrom = 0;
while (true) {
  const idx = t.indexOf('"score": 8.9', searchFrom);
  if (idx < 0) break;
  // Verificar si está cerca de budget-mics
  const ctx = t.slice(Math.max(0, idx - 500), idx + 50);
  if (ctx.includes('budget-mics') || ctx.includes('Shure SM58')) {
    count89++;
  }
  searchFrom = idx + 1;
}
console.log('score 8.9 near budget-mics/SM58: ' + count89);

// === 5. sE7: descripción corta en "What Products Are in This Guide?" ===
// Buscar sE Electronics sE7 en el JSON
const old5 = 'Small-diaphragm cardioid condenser with fast transient response';
const idx5 = t.indexOf(old5);
console.log('sE7 desc found:', idx5 >= 0);
if (idx5 >= 0) console.log(t.slice(idx5 - 50, idx5 + 120));

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
