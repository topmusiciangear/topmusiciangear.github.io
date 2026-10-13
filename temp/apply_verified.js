const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const rowOf = l => g.productTable.rows.find(r => r.label === l);
const log = [];

// ============================================================
// 1) sE NEOM "Best For" — la version propuesta es correcta.
//    sE publica: "smart input level LEDs integrated into the NEOM's gain knob"
//    (el LED esta SOLO en la perilla de ganancia) y un mute switch fisico.
//    La version anterior podia leerse como si el LED estuviera en las tres perillas.
// ============================================================
const NEOM = 6, SENN = 3;
const bf = rowOf('Best For');
console.log('Best For col6 ANTES: ' + bf.values[NEOM].value);
bf.values[NEOM] = {
  value: 'Studio condenser with zero-latency hardware level adjustments and a mechanical mute switch',
  value_es: 'Condensador de estudio con ajustes de nivel en hardware sin latencia y un interruptor de mute mecánico'
};
log.push('sE NEOM / Best For: corregido (el LED de nivel esta solo en la perilla de ganancia, no en las tres)');

// ============================================================
// 2) Sennheiser Profile / Bit Depth - Sample Rate
//    Ficha oficial sennheiser.com -> "Sampling rates: 44.1, 48 kHz"
//    Sennheiser NO publica la profundidad de bits, asi que se dice.
// ============================================================
const bit = rowOf('Bit Depth / Sample Rate');
console.log('\nBitDepth col3 ANTES: ' + bit.values[SENN].value);
if (/^Not published/i.test(bit.values[SENN].value)) {
  bit.values[SENN] = {
    value: '44.1 / 48 kHz (bit depth not published)',
    value_es: '44,1 / 48 kHz (profundidad de bits no publicada)'
  };
  log.push('Sennheiser Profile / Bit Depth: "Not published" -> "44.1 / 48 kHz" (sennheiser.com publica la tasa; no la profundidad)');
}

// ============================================================
// 3) Sennheiser Profile / Weight
//    Ficha oficial: "Product weight (g): 350"
// ============================================================
const w = rowOf('Weight');
console.log('\nWeight col3 ANTES: ' + w.values[SENN].value);
if (/^Not published/i.test(w.values[SENN].value)) {
  w.values[SENN] = { value: '350 g', value_es: '350 g' };
  log.push('Sennheiser Profile / Weight: "Not published" -> "350 g" (ficha oficial)');
}

// ============================================================
// VERIFICACION
// ============================================================
// Anclar la comprobacion: la celda esta vacia SOLO si es exactamente "Not published".
// Sin ancla, el texto nuevo "44.1 / 48 kHz (bit depth not published)" daria falso positivo.
const isBlank = v => /^\s*(Not published|No publicada)\s*$/i.test((v || '').trim());
const fails = [];
if (/RGB/i.test(rowOf('Best For').values[NEOM].value)) fails.push('Best For del NEOM sigue con RGB');
if (isBlank(rowOf('Bit Depth / Sample Rate').values[SENN].value)) fails.push('Bit Depth Sennheiser sigue vacio');
if (isBlank(rowOf('Weight').values[SENN].value)) fails.push('Weight Sennheiser sigue vacio');
g.productTable.rows.forEach(function (r) {
  if (r.values.length !== 10) fails.push(r.label + ' desalineado');
  r.values.forEach((v, i) => { if (!v || !v.value || !v.value_es) fails.push(r.label + ' col' + i + ' incompleta'); });
});
if (fails.length) { console.log('\nABORTADO:\n  ' + fails.join('\n  ')); process.exit(1); }

let blanks = 0, total = 0;
g.productTable.rows.forEach(r => r.values.forEach(v => { total++; if (/^Not published|^No publicada/i.test((v.value || '').trim())) blanks++; }));
console.log('\nCeldas sin dato: ' + blanks + '/' + total + ' (' + Math.round(blanks / total * 100) + '%)   [antes de esta ronda: 18/160 = 11%]');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nAPLICADO (' + log.length + '):');
log.forEach(l => console.log('  - ' + l));