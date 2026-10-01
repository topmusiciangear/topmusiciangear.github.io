// best-looper-pedals: expand from 2 to 8+ products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-looper-pedals');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Boss RC-500 Loop Station',
  'TC Electronic Ditto X4',
  'Electro-Harmonix 720 Stereo Looper',
  'Pigtronix Infinity Looper',
  'Headrush Looperboard',
  'MXR Clone Looper'
];

newProducts.forEach(t => {
  if (!currentTitles.includes(t)) {
    g.productTable.columns.push(W(t));
    currentTitles.push(t);
  }
});

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

put('Best For', [
  V('Pro multi-track looping', 'Multi-pista looping pro'),
  V('Stereo looping, 4 tracks', 'Looping estéreo, 4 pistas'),
  V('Simple high-quality stereo looping', 'Looping estéreo simple calidad'),
  V('Two independent loops, sync', 'Dos loops independientes, sync'),
  V('Tablet-style interface, 4 tracks', 'Interfaz tablet, 4 pistas'),
  V('Mini, simple, great sound', 'Mini, simple, gran sonido')
]);
put('Type', [
  V('Multi-track Looper', 'Looper Multi-pista'),
  V('Stereo Looper', 'Looper Estéreo'),
  V('Stereo Looper', 'Looper Estéreo'),
  V('Dual Looper', 'Looper Dual'),
  V('Multi-track Looper', 'Looper Multi-pista'),
  V('Mono Looper', 'Looper Mono')
]);
put('Controls', [
  V('2 footswitches + 3 knobs + display', '2 footswitches + 3 perillas + display'),
  V('2 footswitches + 3 knobs', '2 footswitches + 3 perillas'),
  V('1 footswitch + 2 knobs', '1 footswitch + 2 perillas'),
  V('2 footswitches + 4 knobs', '2 footswitches + 4 perillas'),
  V('Touchscreen + 1 footswitch', 'Táctil + 1 footswitch'),
  V('1 footswitch + 1 knob', '1 footswitch + 1 perilla')
]);
put('Bypass', [
  V('Buffered', 'Buffered'),
  V('True Bypass', 'True Bypass'),
  V('True Bypass', 'True Bypass'),
  V('True Bypass', 'True Bypass'),
  V('Buffered', 'Buffered'),
  V('True Bypass', 'True Bypass')
]);
put('Power', [
  V('9V DC (PSA adapter included)', '9V DC (adaptador PSA incluido)'),
  V('9V DC', '9V DC'),
  V('9V DC', '9V DC'),
  V('9V DC', '9V DC'),
  V('9V DC (adapter included)', '9V DC (adaptador incluido)'),
  V('9V DC', '9V DC')
]);
put('Current Draw', [
  V('200 mA', '200 mA'),
  V('100 mA', '100 mA'),
  V('86 mA', '86 mA'),
  V('250 mA', '250 mA'),
  V('500 mA', '500 mA'),
  V('50 mA', '50 mA')
]);
put('Size', [
  V('173 x 138 x 57 mm', '173 x 138 x 57 mm'),
  V('138 x 97 x 50 mm', '138 x 97 x 50 mm'),
  V('121 x 92 x 51 mm', '121 x 92 x 51 mm'),
  V('112 x 112 x 55 mm', '112 x 112 x 55 mm'),
  V('210 x 150 x 45 mm', '210 x 150 x 45 mm'),
  V('73 x 111 x 50 mm', '73 x 111 x 50 mm')
]);
put('Standout Feature', [
  V('5 tracks, 13 hrs, MIDI, FX', '5 pistas, 13 hrs, MIDI, FX'),
  V('4 tracks, 7 hrs, MIDI, stereo', '4 pistas, 7 hrs, MIDI, estéreo'),
  V('12 mins stereo, undo/redo, half-speed', '12 min estéreo, undo/redo, half-speed'),
  V('2 independent loops, serial/parallel', '2 loops independientes, serial/paralelo'),
  V('4 tracks, 3 hrs, touchscreen, FX', '4 pistas, 3 hrs, táctil, FX'),
  V('6 mins, undo/redo, tiny footprint', '6 min, undo/redo, huella mínima')
]);

// Fix existing products' Standout Feature if needed
// The original 2 products: Boss RC-5, TC Electronic Ditto Looper
// Their values should already be in rows

// Verdicts for all 8
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Boss RC-5 Loop Station',
    ['13 hours stereo recording, 99 memories', 'MIDI I/O, sync, external footswitch support', '57 built-in rhythms, 7 kits', 'Compact, great display'],
    ['Only 1.5 hrs per track max', 'Menu diving for deep features', 'No built-in FX on loops'],
    ['13 hrs estéreo, 99 memorias', 'MIDI I/O, sync, footswitch externo', '57 ritmos integrados, 7 kits', 'Compacto, gran display'],
    ['Máx 1.5 hrs por pista', 'Menús profundos para features avanzados', 'Sin FX integrados en loops']),
  VD('TC Electronic Ditto Looper',
    ['Simplest looper ever: 1 knob, 1 switch', 'True bypass, analog dry-through', '5 mins looping, unlimited overdubs', 'Tiny, pedalboard friendly'],
    ['No stereo (mono only)', 'No MIDI, no rhythm guide', 'Single track only'],
    ['Looper más simple: 1 perilla, 1 switch', 'True bypass, dry-through analógico', '5 min looping, overdubs ilimitados', 'Pequeño, pedalboard friendly'],
    ['Solo mono (no estéreo)', 'Sin MIDI, sin guía rítmica', 'Solo una pista']),
  VD('Boss RC-500 Loop Station',
    ['5 tracks, 13 hours total, 99 memories', 'MIDI I/O, USB audio, external footswitches', '57 rhythms, 7 drum kits, 16 FX', 'Color display, fader control'],
    ['Complex menu system', 'Larger footprint', 'Steeper learning curve'],
    ['5 pistas, 13 hrs total, 99 memorias', 'MIDI I/O, USB audio, footswitches externos', '57 ritmos, 7 kits bateria, 16 FX', 'Display color, control fader'],
    ['Sistema menús complejo', 'Huella más grande', 'Curva aprendizaje pronunciada']),
  VD('TC Electronic Ditto X4',
    ['4 stereo tracks, 7 hours total', 'MIDI I/O, stereo in/out', 'StarJam loops from artists', 'Loop decay, reverse, half-speed'],
    ['No built-in rhythms', 'Display less informative than Boss', 'Requires computer for backup'],
    ['4 pistas estéreo, 7 hrs total', 'MIDI I/O, entrada/salida estéreo', 'StarJam loops de artistas', 'Decay, reverse, half-speed'],
    ['Sin ritmos integrados', 'Display menos informativo que Boss', 'Requiere PC para backup']),
  VD('Electro-Harmonix 720 Stereo Looper',
    ['12 minutes stereo, 10 independent loops', 'Undo/redo, half-speed, reverse', 'True bypass, silent switching', 'Simple 2-knob interface'],
    ['No MIDI, no rhythms', 'Max 12 mins total (not per loop)', 'No external footswitch support'],
    ['12 min estéreo, 10 loops independientes', 'Undo/redo, half-speed, reverse', 'True bypass, switching silencioso', 'Interfaz 2 perillas simple'],
    ['Sin MIDI, sin ritmos', 'Máx 12 min total (no por loop)', 'Sin soporte footswitch externo']),
  VD('Pigtronix Infinity Looper',
    ['2 independent loops, serial/parallel routing', 'MIDI sync, tap tempo, expression pedal', 'High-headroom preamp, studio quality', 'Infinite overdub per loop'],
    ['Complex workflow', 'Expensive', 'No built-in rhythms/FX'],
    ['2 loops independientes, routing serial/paralelo', 'MIDI sync, tap tempo, pedal expresión', 'Preamp alto headroom, calidad estudio', 'Overdub infinito por loop'],
    ['Flujo trabajo complejo', 'Caro', 'Sin ritmos/FX integrados']),
  VD('Headrush Looperboard',
    ['4 tracks, 3 hours, 7" touchscreen', 'Built-in FX, rhythm generator', 'MIDI I/O, USB audio interface', 'Footswitch + expression pedal support'],
    ['Touchscreen can be fragile', 'High current draw (500 mA)', 'Newer platform, fewer user loops'],
    ['4 pistas, 3 hrs, touchscreen 7"', 'FX integrados, generador ritmos', 'MIDI I/O, interfaz audio USB', 'Soporte footswitch + pedal expresión'],
    ['Touchscreen puede ser frágil', 'Consumo alto (500 mA)', 'Plataforma nueva, menos loops usuario']),
  VD('MXR Clone Looper',
    ['6 minutes, undo/redo, true bypass', 'Analog dry-through, silent switching', 'Tiny footprint, pedalboard friendly', 'Simple 1-knob operation'],
    ['Mono only', 'No MIDI, no rhythms', 'Max 6 mins total'],
    ['6 min, undo/redo, true bypass', 'Dry-through analógico, switching silencioso', 'Huella mínima, pedalboard friendly', 'Operación 1 perilla simple'],
    ['Solo mono', 'Sin MIDI, sin ritmos', 'Máx 6 min total'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-looper-pedals: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));