// Generador de entradas QF_ES_MAP — traducciones curadas + entradas identidad (jerga/spec aceptada)
// Verifica cobertura total de temp/qf_distinct2.txt; FALLA RUIDOSO si queda algo sin decidir.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- traducciones explícitas ----
const TRANSLATE = {
  '0 ms (analog)': '0 ms (analógico)',
  '1/4" in + thru, XLR out': 'entrada de 1/4" + thru, salida XLR',
  '1/4" in; XLR + 2x 1/4" outs': 'entrada de 1/4"; XLR + 2x salidas de 1/4"',
  '2x 1/4" in + thru, 2x XLR out': '2x entradas de 1/4" + thru, 2x salidas XLR',
  '1/4" TRS in (stereo sum), XLR out': 'entrada TRS de 1/4" (suma estéreo), salida XLR',
  '1/4" TRS in, XLR out': 'entrada TRS de 1/4", salida XLR',
  '2x10" + 1" tweeter': '2x10" + tweeter de 1"',
  'AES50, USB, 16 out': 'AES50, USB, 16 salidas',
  'USB, AES50, 16 out': 'USB, AES50, 16 salidas',
  'USB 18x18, network': 'USB 18x18, red',
  'Wi-Fi, Ethernet, USB multitrack': 'Wi-Fi, Ethernet, USB multipista',
  'USB-C, SD, USB drive': 'USB-C, SD, memoria USB',
  'USB-C, MIDI I/O, sync I/O': 'USB-C, E/S MIDI, E/S de sync',
  'USB-C, MIDI I/O': 'USB-C, E/S MIDI',
  'USB-C audio/MIDI, MIDI I/O, SD slot': 'USB-C audio/MIDI, E/S MIDI, ranura SD',
  'USB-C audio/MIDI, MIDI I/O': 'USB-C audio/MIDI, E/S MIDI',
  'USB-C, MIDI In/Out/Thru, sync out': 'USB-C, MIDI In/Out/Thru, salida de sync',
  'USB-C, MIDI Out': 'USB-C, salida MIDI',
  'USB-A/B, MIDI I/O, WiFi, Link': 'USB-A/B, E/S MIDI, WiFi, Link',
  '2x USB-A, USB-B, 4x MIDI out': '2x USB-A, USB-B, 4x salidas MIDI',
  '4x MIDI out': '4x salidas MIDI',
  'HDMI in': 'entrada HDMI',
  'TRRS call': 'llamadas TRRS',
  'USB, Bluetooth, TRRS call, SD': 'USB, Bluetooth, llamadas TRRS, SD',
  'SD slot': 'ranura SD',
  'sync out': 'salida de sync',
  'MPC3 Pro FX pack, XYFX': 'Pack MPC3 Pro FX, XYFX',
  '88 GHS graded hammer': '88 GHS con martillos graduados',
  '88 RH3 hammer': '88 martillos RH3',
  '300W (500W w/ ext. cab)': '300W (500W con caja ext.)',
  '18" with 4" voice coil': '18" con bobina de voz de 4"',
  '18" long-excursion': '18" de excursión larga',
  '918SG 18" ferrite': '918SG 18" de ferrita',
  '1x15" custom Lavoce': '1x15" Lavoce a medida',
  '2x10" Eminence + horn': '2x10" Eminence + tweeter de bocina',
  '6.5" Flax cone': 'cono de lino de 6.5"',
  '3.5" aluminum': '3.5" de aluminio',
  '5" polypropylene': '5" de polipropileno',
  '5" cone': 'cono de 5"',
  '2x 8" aluminum': '2x 8" de aluminio',
  '4.5" woven': '4.5" tejido',
  '3.5" woven': '3.5" tejido',
  '3.5" woven composite': '3.5" compuesto tejido',
  '5.25" woven composite': '5.25" compuesto tejido',
  '4.5" Black Kevlar': '4.5" Kevlar negro',
  '3.5" glass fibre': '3.5" fibra de vidrio',
  '6.5" + 2 radiators': '6.5" + 2 radiadores pasivos',
  'Dual 6.5" composite W cone woofers': 'Doble woofer compuesto W de 6.5"',
  'Dual 8.6 x 4 in obround': 'Doble oblongo de 8.6 x 4 pulgadas',
  '16 mix + 6 matrix': '16 mix + 6 matriz',
  '24 mix + 8 matrix': '24 mix + 8 matriz',
  '12 mix + 8 matrix': '12 mix + 8 matriz',
  'Low': 'Bajo',
  'Moderate': 'Moderado',
  '30W stereo': '30W estéreo',
  '242W total': '242W en total',
  '400W Class D': '400W Clase D',
  '200W (100W standalone)': '200W (100W autónomo)',
  'Standalone + VST3/AU/AAX': 'Autónomo + VST3/AU/AAX',
  'VST3/AU/AAX via Kontakt': 'VST3/AU/AAX vía Kontakt',
  '2x3.5" full-range stereo': '2x3.5" estéreo de rango completo',
  '1.35 lbs (612 g)': '1.35 libras (612 g)',
  '1.8 lbs (816 g)': '1.8 libras (816 g)',
  '21.7 kg (47 lbs 14 oz)': '21.7 kg (47 libras 14 onzas)',
  '~3.6 kg (7.9 lbs)': '~3.6 kg (7.9 libras)',
  '~2.9 kg (6.4 lbs)': '~2.9 kg (6.4 libras)',
  'Single USB-C, HDMI in, USB-C hub': 'USB-C único, entrada HDMI, hub USB-C',
  'Dual USB-C, HDMI, XLR combo': 'Doble USB-C, HDMI, combo XLR',
  'Dual USB-C, BT, WiFi, microSD': 'Doble USB-C, BT, WiFi, microSD'
};

// ---- entradas identidad: jerga/espec/nombres propios aceptados tal cual ----
const IDENT = [
  'USB-C', 'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX/CLAP', 'SSS', 'Omni', '2.4 GHz',
  'Session View, Max for Live', 'VST3/AU/AAX', 'HSS', 'VST/VST3/AU/AAX',
  '40 Hz–15 kHz', 'iLok', 'Dreadnought', '16 MIDAS', 'Overdrive', 'Shotgun',
  '20 Hz–20 kHz', '50 Hz–20 kHz', 'True bypass', '49 Hz – 20 kHz (±3 dB)', 'USB',
  'Thunderbolt 3', 'USB-C (USB 2.0)', '50 Hz–15 kHz', 'Digital', 'USB 2.0',
  '2x Fender alnico J', 'Wi-Fi, USB, 6 aux', '40 Hz–18 kHz', 'USB/XLR',
  '47 Hz – 20 kHz (±3 dB)', 'Grand Auditorium', 'PHA-4 Standard (escapement)',
  '2 Unison', '16 MIDAS PRO', '15 Hz – 20 kHz', '50 Hz–16 kHz', '1x12" Jensen C-12N',
  '2x Player Alnico 5 J', 'MCU/HUI', 'USB-C, MIDI, WiFi, Bluetooth', 'Meranti',
  '20 Studer', '4 D-PRE', 'USB 2x2', '32x32 USB', '30 Hz–17 kHz', '47 Hz – 21 kHz (±3 dB)',
  '7" Kevlar', '145W RMS (97W + 48W)', '45 Hz – 36 kHz (±3 dB)', 'Lobar',
  'AN-X + AWM2 + FM-X', 'Player split coil P', '48 Hz – 20 kHz (±2 dB)',
  'VST3/AU/AAX + ARA', 'Split P + J (Dynamix)', '2x Marcus Revolution single-coil',
  '2x YGD humbuckers', 'Nyatoh', '16 aux + LR', '1 x 10" Special Design', '16 D-PRE',
  'GHC (Graded Hammer Compact)', 'Nylon', 'USB, 2x dSnake, tablet', '40 Hz – 35 kHz (±3 dB)',
  '48 Hz – 20 kHz', 'Delay', '100 Hz–16 kHz', 'Groovebox', 'Ultra II Noiseless P + J',
  '200 Hz – 4 kHz', '1.9 GHz', '7" MLM', '110W RMS (90W + 20W)', '44 Hz – 41 kHz',
  '47 Hz – 25 kHz', '38 Hz – 20 kHz (±1.5 dB)', 'Harmonic Spectral Processor',
  'USB 64x64 + SD', '16 XMAX-R', 'USB 64x64, AVB, SD', 'Okoume', 'Bartolini BH2',
  '1x10" + tweeter', '2x ESP SB-4 humbuckers', 'YGD V5 P/J (Alnico V)', '8 x Ultra-HDDA',
  '8 x HiVolt', '5 Hz – 48 kHz', '45 Hz–18 kHz', '10x D-PRE', '18" woofer',
  '45 Hz – 21 kHz (±3 dB)', '74 Hz – 20 kHz (±2.5 dB)', '57 Hz – 21 kHz (±3 dB)',
  'Agathis', 'Native Access', '50W RMS', '2x12" Celestion G12M Greenback', '60 Hz–18 kHz',
  '1x12" Celestion V-Type', 'USB-C, Ethernet', 'USB 3.0 + MADI', '2x 7" woofers',
  '30 Hz – 50 kHz (-20 dB)', '50 Hz – 15 kHz', '6 XENYX', 'Orchestra Model',
  '20 aux + LR', '16 FlexMix + LR', 'Diamond SuperRock MM + Diamond P',
  'YGD Custom V5 Alnico V PJ', 'V-Mod II x2', 'Ultra II Noiseless Vintage J', 'Concert',
  'Modified 0', '4 x GSPre', 'USB 4x4 24-bit/96kHz', '7 Onyx', 'USB 2x4 24-bit/192kHz',
  '4 x SuperAnalogue (+72dB)', '8 Ghost', '1x12" + tweeter', '2x Bartolini BH2',
  '2x Marcus Pure-H humbuckers', '2x Steinberger humbuckers', 'Alnico 5 split P + single J',
  '2x single-coil', '1 x 8" Orange', '12 Soundcraft', '24 Midas PRO', 'USB 48x48, AES50, SD',
  'Smart Scaled Hammer Action', 'GrandTouch-S (escapement)', 'GHS (no escapement)',
  'GrandTouch-E (escapement)', 'ACB 808/909/606 + TB-303', 'Bluetooth, USB', 'EVS-18L 18"',
  'Looper', 'XLR', '100W (sub) + 2 x 20W', '54 Hz – 21 kHz (±3 dB)', '40 Hz – 40 kHz',
  '5" Kevlar', '55W RMS (35W + 20W)', '54 Hz – 30 kHz (±3 dB)', '47 Hz – 25 kHz (-6 dB)',
  '45 Hz – 23.2 kHz (-6 dB)', '45 Hz – 25 kHz', '54 Hz – 30 kHz (-10 dB)', 'VST/AU/AAX',
  '1x10" Voice of the World', 'True bypass / trails', '4 GB RAM / 32 GB + 64 GB SD',
  'USB-A/B, MIDI, WiFi, Bluetooth', '16 GB RAM / 256 GB NVMe SSD', 'Wavetable + granular',
  '2x ProBucker 760 humbuckers', '2x Marcus Vintage-J Revolution', '2x G&L MFD humbuckers',
  'USB 2.0 (Type-B)', '20 Hz – 20 kHz', 'AA / USB', 'V-Mod II split coil',
  '2x V-Mod II J single coils', 'VST2/AU/AAX (no VST3/CLAP)', '1x12" Celestion',
  '2x10" + piezo tweeter', '1x12" Jensen Neo', 'Phaser', 'USB, Ethernet', 'EUCON',
  'Mackie Control/HUI', 'MCU/HUI/Logic', 'USB, MIDI', '6.5" Slatefiber',
  '40 Hz – 22 kHz (±3 dB)', '24-bit/48 kHz', 'Omni 20 Hz – 20 kHz',
  'USB-C + OTG USB-C + USB-A hub', 'A/D 136 dBA', '2× Neumann, 78 dB',
  'USB-C + AES67/RAVENNA', 'USB-C + ADAT/AES', '8× Unison', 'Thunderbolt/USB-C',
  '32-bit/192kHz ESS', 'Thunderbolt 3 + USB', '11" sub + 5" mid', '30 Hz – 40 kHz (±3 dB)',
  '160W RMS', '65 Hz – 20 kHz (-3 dB)', '80 Hz – 20 kHz', '69 Hz – 22 kHz',
  '70 Hz – 20 kHz (-3 dB)', '70 Hz – 20 kHz (±3 dB)', '4" woofer', '68 Hz – 20 kHz',
  'Sapelli', '42 Hz – 22 kHz (-10 dB)', '36 Hz – 32 kHz (-10 dB)',
  'V-Piano + SuperNATURAL', 'ZEN-Core + V-Piano + ACB', '88 PHA-50 hybrid wood',
  '88 NW-GH3 wooden graded', '88 PHA-50 hybrid + channel AT', '16 FlexMixes + 4 FX'
];

// ---- cargar valores pendientes del audit ----
const pending = fs.readFileSync(B + 'temp/qf_distinct2.txt', 'utf8').split(/\r?\n/).filter(Boolean)
  .map(l => l.replace(/^\d+\s+/, ''));

// ---- extraer claves existentes del mapa ----
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const mapStart = bg.indexOf('var QF_ES_MAP');
if (mapStart < 0) { console.error('NO MAP'); process.exit(1); }
// Cierre real del mapa = primera línea "};" en columna 0 tras el inicio.
// Un contador de llaves se confunde con llaves/strings; un regex global trocea
// las claves que contienen " (pulgadas). Línea a línea es fiable.
const bgLines = bg.split('\n');
const startLine = bg.slice(0, mapStart).split('\n').length - 1;
let closeLine = -1;
for (let i = startLine; i < bgLines.length; i++) {
  if (bgLines[i].replace(/\r$/, '') === '};') { closeLine = i; break; }
}
if (closeLine < 0) { console.error('NO CLOSE'); process.exit(1); }
const existing = new Set();
for (let i = startLine + 1; i < closeLine; i++) {
  const m = bgLines[i].replace(/\r$/, '').match(/^\s*'(.+)':\s*'(.*)',?\s*$/);
  if (m) existing.add(m[1]);
}
console.log('claves existentes en QF_ES_MAP: ' + existing.size);

// ---- cobertura ----
const newEntries = [];
let addedT = 0, addedI = 0, skipped = 0;
const missing = [];
for (const v of pending) {
  if (existing.has(v)) { skipped++; continue; }
  if (Object.prototype.hasOwnProperty.call(TRANSLATE, v)) {
    newEntries.push([v, TRANSLATE[v]]); addedT++;
  } else if (IDENT.indexOf(v) >= 0) {
    newEntries.push([v, v]); addedI++;
  } else {
    missing.push(v);
  }
}
console.log('pendientes: ' + pending.length + ' | ya en mapa: ' + skipped + ' | traducidas: ' + addedT + ' | identidad: ' + addedI);
if (missing.length) {
  console.error('✗ SIN DECIDIR (' + missing.length + '):');
  missing.forEach(x => console.error('   ' + JSON.stringify(x)));
  process.exit(1);
}

// ---- insertar antes del cierre del mapa ----
const blockLines = [];
for (const [k, v] of newEntries) blockLines.push("  '" + k + "': '" + v + "',");
// asegurar coma en la última entrada existente
const lastEntryIdx = closeLine - 1;
if (!/,$/.test(bgLines[lastEntryIdx].replace(/\r$/, ''))) {
  bgLines[lastEntryIdx] = bgLines[lastEntryIdx].replace(/\r$/, '') + ',\r';
  console.log('coma añadida a la última entrada existente');
}
const out = bgLines.slice(0, closeLine).concat(blockLines, bgLines.slice(closeLine)).join('\n');
fs.writeFileSync(B + 'build-guides.js', out, 'utf8');
console.log('✓ ' + newEntries.length + ' entradas añadidas a QF_ES_MAP (antes del cierre del objeto)');
