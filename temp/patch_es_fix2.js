// PATCH 2 — residuos multitrack en guides.json + products.json desc_es
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let hasError = false;
function patch(file, ops) {
  const p = B + file;
  let t = fs.readFileSync(p, 'utf8');
  console.log('== ' + file);
  for (const [needle, replacement, expected] of ops) {
    const parts = t.split(needle);
    const n = parts.length - 1;
    if (n === 0) { console.error('  ✗ MISS «' + needle.slice(0, 70) + '»'); hasError = true; continue; }
    if (expected != null && n !== expected) console.error('  ⚠ COUNT «' + needle.slice(0, 60) + '» esperado ' + expected + ' real ' + n);
    t = parts.join(replacement);
    console.log('   ' + n + 'x ' + needle.slice(0, 60));
  }
  try { JSON.parse(t); } catch (e) { console.error('  ✗ JSON PARSE ROTO: ' + e.message); hasError = true; return; }
  fs.writeFileSync(p, t, 'utf8');
  console.log('   ✓ escrito + JSON.parse OK');
}

patch('data/guides.json', [
  ['grabación de audio multitrack', 'grabación de audio multipista', 1]
]);
patch('data/products.json', [
  ['grabación y reproducción multitrack', 'grabación y reproducción multipista', 1],
  ['grabación multitrack', 'grabación multipista', 3],
  ['y multitrack SQ-Drive', 'y SQ-Drive multipista', 1]
]);

// escaneo residual mejorado: solo ventanas con señal española ANTES de la palabra
console.log('\n== RESIDUOS multitrack (señal ES) ==');
const RX = /(?:grabación|graban|grabadora|grabar|reproducción|enmascaramiento|Análisis|análisis|de|y) multitrack/i;
for (const f of ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json']) {
  const t = fs.readFileSync(B + f, 'utf8');
  let idx = 0, found = 0;
  while ((idx = t.indexOf('multitrack', idx)) >= 0) {
    const before = t.slice(Math.max(0, idx - 40), idx);
    if (RX.test(before)) {
      console.log(f + ' @' + idx + ': …' + t.slice(Math.max(0, idx - 90), idx + 90).replace(/\s+/g, ' ') + '…');
      found++;
    }
    idx += 10;
  }
  if (!found) console.log(f + ': limpio');
}
console.log(hasError ? '\n✗ PATCH2 CON ERRORES' : '\n✓ PATCH2 OK');
process.exitCode = hasError ? 1 : 0;
