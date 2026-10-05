const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-mic-for-podcasting');
function cell(label, i, en, es) {
  const r = g.productTable.rows.find(r => r.label === label);
  if (!r || !r.values[i]) { console.log('MISS ' + label + ' col' + i); process.exitCode = 1; return; }
  r.values[i].value = en; r.values[i].value_es = es;
  console.log('OK ' + label + ' col' + i);
}
// col order: SM58(0) PodMic(1) Procaster(2) SM7B(3) NT1-5th(4) NT1-Sig(5) XM8500(6) MV7+(7) MELO(8) PodMicUSB(9)
// 1. MELO P1: condenser only, 255g
cell('Type', 8, 'Wireless system (1-inch condenser mic)', 'Sistema inalámbrico (micro de condensador de 1 pulgada)');
cell('Capsule / Diaphragm', 8, '1-inch LDC condenser, wireless to 55 g mini-mixer', 'Condensador LDC de 1 pulgada, inalámbrico a minimixer de 55 g');
cell('Weight', 8, '255 g', '255 g');
// 2. MV7+: 573g, 164x207x90 in yoke, 350 ohm
cell('Weight', 7, '573 g', '573 g');
cell('Dimensions', 7, '164 × 207 × 90 mm (in yoke)', '164 × 207 × 90 mm (con horquilla)');
cell('Output / Preamp', 7, '350 Ω', '350 Ω');
// 3. PodMic USB: 896g, same dims, 320 ohm XLR, 20-20k; classic PodMic 50-13k
cell('Weight', 9, '896 g', '896 g');
cell('Dimensions', 9, '175 × 109 × 62 mm', '175 × 109 × 62 mm');
cell('Output / Preamp', 9, '320 Ω (XLR)', '320 Ω (XLR)');
cell('Frequency Response', 9, '20 Hz – 20 kHz', '20 Hz – 20 kHz');
cell('Frequency Response', 1, '50 Hz – 13 kHz', '50 Hz – 13 kHz');
// 4. NT1 5th phantom
cell('Phantom Power', 4, '+48 V (XLR) / USB bus powered', '+48 V (XLR) / alimentado por bus USB');
// 5. SM7B max SPL
cell('Max SPL', 3, 'Virtually infinite (passive dynamic)', 'Prácticamente infinito (dinámico pasivo)');
// 6. XM8500 dims + weight
cell('Dimensions', 6, '165 × 52 mm', '165 × 52 mm');
cell('Weight', 6, '240 g', '240 g');
fs.writeFileSync(F, JSON.stringify(G, null, 2));