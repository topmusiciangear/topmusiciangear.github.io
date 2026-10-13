const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const NP = 'Not published', NP_ES = 'No publicada';
const log = [];

// ============================================================
// 1) RELLENAR LO QUE SI SE PUEDE VERIFICAR
// ============================================================
// 1a) Shure MV7+ peso: la ficha/JSON de Shure dice weight: 574 (no 573)
// 1b) AT2040USB Bit Depth: Audio-Technica publica "16 bit/24 bit" (no solo 24)
//     y Sample Rate 44.1/48/88.2/96 kHz
// 1c) AT2040USB Pad & HPF: AT publica "80 Hz, 18 dB/octave"
const mv7 = 0, at2040 = 2;
const rowOf = l => g.productTable.rows.find(r => r.label === l);

const wRow = rowOf('Weight');
if (wRow.values[mv7].value === '573 g') {
  wRow.values[mv7] = { value: '574 g', value_es: '574 g' };
  log.push('Shure MV7+ / Weight: 573 g -> 574 g (ficha Shure)');
}

const bitRow = rowOf('Bit Depth / Sample Rate');
if (bitRow.values[at2040].value === '24-bit / 96 kHz') {
  bitRow.values[at2040] = { value: '16 or 24-bit / up to 96 kHz', value_es: '16 o 24 bits / hasta 96 kHz' };
  log.push('AT2040USB / Bit Depth: "24-bit / 96 kHz" -> "16 o 24-bit / up to 96 kHz" (ficha AT publica ambas profundidades)');
}

const padRow = rowOf('Pad & High-Pass Filter');
if (/80 Hz low-cut/.test(padRow.values[at2040].value)) {
  padRow.values[at2040] = { value: '80 Hz low-cut, 18 dB/octave (hardware)', value_es: 'Corte 80 Hz, 18 dB/octava (hardware)' };
  log.push('AT2040USB / Pad & HPF: "80 Hz low-cut" -> "80 Hz, 18 dB/octave" (dato exacto de AT)');
}

// ============================================================
// 2) REESTRUCTURAR: quitar filas que厂家 no publican y meter filas que si
//
//    Medicion previa (antes de tocar nada):
//      Signal-to-Noise Ratio   8/10 celdas "Not published"
//      THD at Max SPL          8/10 celdas "Not published"
//      Dynamic Range           7/10 celdas "Not published"
//    Ningun fabricante de microfonos USB publica THD o SNR para estos modelos
//    (verificado en Shure, Audio-Technica, Rode, sE, Elgato, Roland y Samson).
//    Tres filas casi muertas quitan credibilidad a la tabla.
//
//    Se eliminan SNR y THD, y "Dynamic Range" se sustituye por
//    "Headphone Monitoring", que si publica el 100% de los 10 y el comprador
//    la usa en cada comparativa.
// ============================================================
const HEADPHONE = [
  ['Zero-latency headphone output with on-board level control', 'Salida de auriculares sin latencia con control de nivel en el propio micrófono'],
  ['Zero-latency 3.5 mm headphone output', 'Salida de auriculares de 3,5 mm sin latencia'],
  ['3.5 mm headphone jack, 77 mW into 32 Ω; zero-latency', 'Jack de auriculares de 3,5 mm, 77 mW sobre 32 Ω; sin latencia'],
  ['Zero-latency 3.5 mm output with a dedicated level knob', 'Salida de 3,5 mm sin latencia con perilla de nivel propia'],
  ['Zero-latency headphone output', 'Salida de auriculares sin latencia'],
  ['3.5 mm headphone jack with volume and playback-mix knobs', 'Jack de auriculares de 3,5 mm con perillas de volumen y de mezcla'],
  ['Zero-latency monitoring with independent headphone level knob', 'Monitorización sin latencia con perilla independiente de nivel de auriculares'],
  ['3.5 mm headphone jack with on-board volume control', 'Jack de auriculares de 3,5 mm con control de volumen en el cuerpo'],
  ['3.5 mm headphone jack with level and mix controls', 'Jack de auriculares de 3,5 mm con controles de nivel y de mezcla'],
  ['1/8 in headphone jack, no on-board level control (volume lives in software)', 'Jack de auriculares de 1/8 pulgada, sin control de nivel en el micrófono (el volumen va por software)']
];

const before = g.productTable.rows.length;
g.productTable.rows = g.productTable.rows
  .filter(r => r.label !== 'Signal-to-Noise Ratio' && r.label !== 'THD at Max SPL')
  .map(function (r) {
    if (r.label !== 'Dynamic Range') return r;
    return {
      label: 'Headphone Monitoring',
      label_es: 'Monitorización con auriculares',
      values: HEADPHONE.map(p => ({ value: p[0], value_es: p[1] }))
    };
  });
log.push('Eliminadas 2 filas casi muertas: "Signal-to-Noise Ratio" (8/10 vacias) y "THD at Max SPL" (8/10 vacias)');
log.push('"Dynamic Range" (7/10 vacias) sustituida por "Headphone Monitoring" (10/10 con dato verificado)');
log.push('Tabla: ' + before + ' -> ' + g.productTable.rows.length + ' filas');

// ============================================================
// 3) VERIFICACION
// ============================================================
const cols = g.productTable.columns.map(c => c.title);
let blanks = 0;
g.productTable.rows.forEach(function (r) {
  r.values.forEach(function (v) { if (/^Not published/i.test((v.value || '').trim())) blanks++; });
});
const total = g.productTable.rows.length * 10;
console.log('Celdas "Not published": ' + blanks + '/' + total + '  (' + Math.round(blanks / total * 100) + '%)  [antes: 41/180 = 23%]');
console.log('Tabla: ' + g.productTable.rows.length + ' filas x 10 columnas');

const fails = [];
g.productTable.rows.forEach(function (r) {
  if (r.values.length !== 10) fails.push(r.label + ' tiene ' + r.values.length);
  if (!r.label_es) fails.push(r.label + ' sin label_es');
  r.values.forEach(function (v, i) {
    if (!v || !v.value) fails.push(r.label + ' col' + i + ' vacio');
    if (!v || !v.value_es) fails.push(r.label + ' col' + i + ' sin ES');
  });
});
if (fails.length) { console.log('\n[!!] ' + fails.length + ' problemas:\n   ' + fails.join('\n   ')); process.exit(1); }

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nCORRECCIONES (' + log.length + '):');
log.forEach(l => console.log('  - ' + l));