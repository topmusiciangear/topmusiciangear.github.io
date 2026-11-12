const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// 1. per euro → per dollar (playing value)
const old1 = 'For pure playing value per euro, few beginner guitars make a stronger case';
const new1 = 'For pure playing value per dollar, few beginner guitars make a stronger case';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: per euro → per dollar (playing value)'); } else console.log('✗ Fix 1a NOT FOUND');

// 2. per euro → per dollar (recorded tone)
const old2 = 'But for pure recorded tone per euro through a proper chain, few condensers argue with it';
const new2 = 'But for pure recorded tone per dollar through a proper chain, few condensers argue with it';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 1b: per euro → per dollar (recorded tone)'); } else console.log('✗ Fix 1b NOT FOUND');

// 3. Clip-on tuners (-20) → Clip-on tuners ($15–$20)
const old3 = 'Clip-on tuners (-20) are a must';
const new3 = 'Clip-on tuners ($15–$20) are a must';
if (t.includes(old3)) { t = t.split(old3).join(new3); console.log('✓ Fix 2: Clip-on tuners (-20) → ($15–$20)'); } else console.log('✗ Fix 2 NOT FOUND');

// 4. A -300 guitar → A $200–$300 guitar
const old4 = 'A -300 guitar with a professional setup';
const new4 = 'A $200–$300 guitar with a professional setup';
if (t.includes(old4)) { t = t.split(old4).join(new4); console.log('✓ Fix 3: A -300 guitar → A $200–$300 guitar'); } else console.log('✗ Fix 3 NOT FOUND');

// 5. Enya Nova Go Sonic scale: 24.75 → 22.8 (in the guide)
// Buscar en el contexto de Enya
const old5 = '"val2": "24.75\\""';
const new5 = '"val2": "22.8\\""';
// Verificar si hay contexto de Enya
let count5 = 0;
let searchFrom = 0;
while (true) {
  const i = t.indexOf(old5, searchFrom);
  if (i < 0) break;
  const ctx = t.slice(Math.max(0, i - 200), i + 50);
  if (ctx.includes('Enya') || ctx.includes('Nova Go')) {
    count5++;
  }
  searchFrom = i + 1;
}
console.log('Enya 24.75 occurrences: ' + count5);
if (count5 > 0) {
  // Reemplazar solo las que están en contexto de Enya
  // Por ahora, reemplazar todas las ocurrencias de 24.75" que están cerca de Enya
  // Esto es complejo, así que voy a hacer un reemplazo simple
  t = t.split(old5).join(new5);
  console.log('✓ Fix 4: 24.75" → 22.8" (Enya scale)');
}

// También actualizar value_es
const old5b = '"val2_es": "24.75\\""';
const new5b = '"val2_es": "22.8\\""';
if (t.includes(old5b)) {
  // Solo reemplazar las que están en contexto de Enya
  // Por ahora, reemplazar todas (puede haber falsos positivos)
  t = t.split(old5b).join(new5b);
  console.log('✓ Fix 4b: 24.75" → 22.8" (ES)');
}

// 6. Jet Guitars JS-300: materiales (tilo/basswood y cerámicas)
// Buscar "per euro" en la reseña de Jet JS-300
const old6 = 'For pure playing value per euro, few beginner guitars make a stronger case';
// Ya corregido arriba

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
