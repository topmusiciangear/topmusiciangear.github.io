const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const R = {};
g.productTable.rows.forEach(r => { R[r.label] = r; });

const NP = 'Not published', NP_ES = 'No publicada';
const NEOM = 6, NTUSB = 5, AT2020X = 8;
const log = [];
const set = (label, col, en, es) => {
  R[label].values[col] = { value: en, value_es: es };
  console.log(label + ' col' + col + ':');
  console.log('   antes: ' + R[label].values[col].value);
};

// ============================================================
// 1) sE NEOM "Best For": RGB y "tap-to-mute" NO EXISTEN
//    Pagina oficial sE: "smart input level LEDs integrated into the NEOM's
//    gain knob". No hay RGB en ninguna parte. El texto venía del Razer
//    Seiren V3 Pro, que se eliminó de la guía, y además contradecía su
//    propio contra ("No RGB lighting or gaming aesthetics").
// ============================================================
set('Best For', NEOM,
  'Gaming/streaming with three hardware knobs and a LED level ring on the gain knob',
  'Gaming/streaming con tres perillas físicas y un anillo de LED de nivel en la perilla de ganancia');

// ============================================================
// 2) sE NEOM "Pad & High-Pass Filter": "Software -10 dB pad" NO PUBLICADO
//    La ficha oficial de sE no menciona pad, -10 dB, low-cut, high-pass ni DSP.
// ============================================================
set('Pad & High-Pass Filter', NEOM, NP, NP_ES);

// ============================================================
// 3) sE NEOM "Type": la ficha dice conector USB-C integrado
// ============================================================
set('Type', NEOM, 'Condenser, cardioid, USB-C', 'Condensador, cardioide, USB-C');

// ============================================================
// 4) Output Impedance: Rode y sE no publican impedancia de salida
//    NT-USB+ (rode.com/en/products/nt-usb-plus): la ficha publica sensibilidad,
//    self-noise, max SPL, rango dinamico, peso y medidas. NO impedancia de salida.
//    sE NEOM: la ficha publica componentes, sonido, medidas y peso. NO impedancia.
// ============================================================
set('Output Impedance', NTUSB, NP, NP_ES);
set('Output Impedance', NEOM, NP, NP_ES);

// ============================================================
// 5) Normalizar formato: la unica celda con "20 - 20.000 Hz" en vez de "20 Hz - 20 kHz"
//    (mantiene el dato de la ficha oficial de Audio-Technica, solo cambia el formato)
// ============================================================
set('Frequency Response', AT2020X, '20 Hz – 20 kHz', '20 Hz – 20 kHz');

// ============================================================
// 6) Coherencia interna: el "Best For" del NEOM ya no debe mencionar RGB
//    y su contra sobre RGB vuelve a ser coherente.
// ============================================================
const vpcNeom = g.verdictProsCons[NEOM];
const rgbCons = vpcNeom.cons.filter(c => /RGB/i.test(c));
console.log('\nContras del NEOM sobre RGB: ' + rgbCons.length + '  -> "' + (rgbCons[0] || '').slice(0, 90) + '"');
const bf = R['Best For'].values[NEOM].value;
if (/RGB/i.test(bf)) { console.log('[!!] el Best For sigue mencionando RGB'); process.exit(1); }
console.log('Best For ya NO menciona RGB -> coherente con su contra [OK]');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nCORRECCIONES APLICADAS: ' + (log.length + 6));
log.forEach(l => console.log('  - ' + l));