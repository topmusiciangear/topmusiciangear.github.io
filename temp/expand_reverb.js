const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-reverb-delay');
const t = g.productTable;
if (t.columns.length !== 8) throw new Error('expected 8 cols');
const NCOLS = ['Keeley Caverns V2', 'UA Del-Verb', 'MXR Carbon Copy', 'UA Golden Reverberator', 'Boss RV-200'];
NCOLS.forEach(n => t.columns.push({ title: n, title_es: n }));
const trow = l => t.rows.find(rr => rr.label === l);
// existing 8 cols DSP values for the new row (order: DD-8,HOF2,MX,TL,LVX,Habit,TF,Nemesis)
const dspOld = ['\u2014', '\u2014', 'ARM tri-core 800 MHz, 32-bit float', '\u2014', 'ARM, 32-bit float', '\u2014', '\u2014', '\u2014'];
const dspOldEs = ['\u2014', '\u2014', 'ARM tri-core 800 MHz, 32 bits flotantes', '\u2014', 'ARM, 32 bits flotantes', '\u2014', '\u2014', '\u2014'];
const C = {
  'Best For': [
    ['Mid-range delay+reverb combo', 'Combo delay+reverb de gama media'],
    ['Studio-grade hybrid ambience', 'Ambiente h\u00edbrido de estudio'],
    ['Warm analog slapback', 'Slapback anal\u00f3gico c\u00e1lido'],
    ['Classic spring/plate/hall verbs', 'Reverbs cl\u00e1sicas spring/plate/hall'],
    ['Preset reverb all-rounder', 'Reverb con presets para todo']
  ],
  'Estimated Price': [
    ['~$199', '~$199'], ['~$349', '~$349'], ['~$159.99', '~$159.99'], ['~$399', '~$399'], ['~$269', '~$269']
  ],
  'Type': [
    ['Delay + reverb combo', 'Combo delay+reverb'],
    ['Delay + reverb combo', 'Combo delay+reverb'],
    ['Analog delay (BBD)', 'Delay anal\u00f3gico (BBD)'],
    ['Reverb (Spring/Plate/Hall)', 'Reverb (Spring/Plate/Hall)'],
    ['Digital reverb (12 modes)', 'Reverb digital (12 modos)']
  ],
  'Controls': [
    ['Blend x2, Decay, Rate, Time, Repeats, Warmth', 'Blend x2, Decay, Rate, Time, Repeats, Warmth'],
    ['Knobs, tap tempo, UAFX app', 'Perillas, tap tempo, app UAFX'],
    ['Mix, Regen, Delay, Mod switch', 'Mix, Regen, Delay, Mod switch'],
    ['Knobs + A/B/C switch + UAFX app', 'Perillas + switch A/B/C + app UAFX'],
    ['Mode, Time, Pre-Delay, E.Level, Param, Low, High', 'Mode, Time, Pre-Delay, E.Level, Param, Low, High']
  ],
  'Bypass': [
    ['True bypass / Trails', 'True bypass / Trails'],
    ['Buffered (trails)', 'Buffered (trails)'],
    ['True bypass', 'True bypass'],
    ['True / buffered (app)', 'True / buffered (app)'],
    ['Buffered (carryover)', 'Buffered (carryover)']
  ],
  'Power': [
    ['9V DC', '9V DC'],
    ['9V DC (400 mA)', '9V DC (400 mA)'],
    ['9V DC (optional battery)', '9V DC (optional battery)'],
    ['9V DC (400 mA)', '9V DC (400 mA)'],
    ['9V DC (3xAA / adapter)', '9V DC (3xAA / adaptador)']
  ],
  'Current Draw': [
    ['75 mA', '75 mA'],
    ['400 mA', '400 mA'],
    ['26 mA', '26 mA'],
    ['400 mA', '400 mA'],
    ['260 mA', '260 mA']
  ],
  'Size': [
    ['94 x 119 x 50 mm', '94 x 119 x 50 mm'],
    ['92 x 141 x 65 mm', '92 x 141 x 65 mm'],
    ['70 x 121 x 33 mm', '70 x 121 x 33 mm'],
    ['92 x 141 x 65 mm', '92 x 141 x 65 mm'],
    ['101 x 138 x 63 mm', '101 x 138 x 63 mm']
  ],
  'Standout Feature': [
    ['Magnetic tape delay + Spring/Mod/Shimmer', 'Delay magn\u00e9tico + Spring/Mod/Shimmer'],
    ['Starlight + Golden engines, dual stereo', 'Motores Starlight + Golden, est\u00e9reo dual'],
    ['100% analog BBD, 600 ms + modulation', 'BBD 100% anal\u00f3gico, 600 ms + modulaci\u00f3n'],
    ['Spring 65, Plate 140, Hall 224', 'Spring 65, Plate 140, Hall 224'],
    ['12 verbs, 127 memories, 32-bit/96 kHz', '12 reverbs, 127 memorias, 32-bit/96 kHz']
  ],
  'DSP / Processing': [
    ['\u2014', '\u2014'],
    ['UAFX dual-engine', 'UAFX dual-engine'],
    ['Analog path (no DSP)', 'Ruta anal\u00f3gica (sin DSP)'],
    ['UAFX dual-engine', 'UAFX dual-engine'],
    ['Custom Boss DSP, 32-bit/96 kHz', 'Custom Boss DSP, 32-bit/96 kHz']
  ]
};
Object.keys(C).forEach(label => {
  let r = trow(label);
  if (!r) {
    if (label !== 'DSP / Processing') throw new Error('row missing: ' + label);
    const di = t.rows.findIndex(rr => rr.label === 'Current Draw');
    r = { label: 'DSP / Processing', label_es: 'DSP / Procesamiento', values: dspOld.map((v, i) => ({ value: v, value_es: dspOldEs[i] })) };
    t.rows.splice(di + 1, 0, r);
  }
  if (r.values.length !== 8) throw new Error(label + ' has ' + r.values.length + ' values');
  C[label].forEach(([en, es]) => r.values.push({ value: en, value_es: es }));
});
console.log('table expanded to', t.columns.length, 'cols');
// ---------- verdicts ----------
const NV = [
  { name: 'Keeley Caverns V2',
    pros: ['Magnetic tape-style delay with wow/flutter modulation up to 650 ms', 'Spring, Shimmer and Modulated reverbs switch independently', 'Trails or true bypass with top-mounted jacks', 'Two effects for $199 in a compact box'],
    cons: ['Mono in/out only \u2014 no stereo spread', 'No presets, MIDI or deep editing', 'Digital emulation, not real tape or springs', '650 ms maximum is short next to long digital delays'],
    pros_es: ['Delay magn\u00e9tico con modulaci\u00f3n wow/flutter de hasta 650 ms', 'Reverbs Spring, Shimmer y con modulaci\u00f3n conmutables por separado', 'Trails o true bypass con jacks superiores', 'Dos efectos por 199 $ en una caja compacta'],
    cons_es: ['Solo mono \u2014 sin apertura est\u00e9reo', 'Sin presets, MIDI ni edici\u00f3n profunda', 'Emulaci\u00f3n digital, no cinta ni muelles reales', '650 ms de m\u00e1ximo cortos frente a delays digitales largos'] },
  { name: 'UA Del-Verb',
    pros: ['Starlight tape/Memory Man plus Golden spring/plate/hall in one box', 'Dual stereo engines you can combine', 'Tap tempo plus downloadable voicings via app', 'Analog dry-through with silent switching'],
    cons: ['PSU sold separately and it needs 400 mA isolated', 'Deep control lives in the app, not on the panel', '$349 buys six sounds \u2014 pricey per effect', 'No 5-pin MIDI DIN \u2014 MIDI only over USB/Bluetooth'],
    pros_es: ['Starlight tape/Memory Man m\u00e1s spring/plate/hall Golden en una caja', 'Motores duales est\u00e9reo combinables', 'Tap tempo m\u00e1s voces descargables por app', 'Dry anal\u00f3gico con conmutaci\u00f3n silenciosa'],
    cons_es: ['Fuente aparte y pide 400 mA aislados', 'El control a fondo vive en la app, no en el panel', '349 $ por seis sonidos \u2014 caro por efecto', 'Sin MIDI DIN de 5 pines \u2014 MIDI solo por USB/Bluetooth'] },
  { name: 'MXR Carbon Copy',
    pros: ['100% analog bucket-brigade warmth', '600 ms with switchable modulation', '26 mA sips power \u2014 runs on a 9V battery', 'Three knobs and done'],
    cons: ['Dark repeats lack digital clarity', 'No presets, MIDI, tap tempo or display', 'Modulation trims live inside on tiny pots', '600 ms maximum is short for ambient washes'],
    pros_es: ['Calidez bucket-brigade 100% anal\u00f3gica', '600 ms con modulaci\u00f3n conmutable', '26 mA de consumo \u2014 funciona con pila de 9V', 'Tres knobs y listo'],
    cons_es: ['Repeticiones oscuras sin claridad digital', 'Sin presets, MIDI, tap tempo ni pantalla', 'Los trims de modulaci\u00f3n est\u00e1n dentro en minipots', '600 ms de m\u00e1ximo cortos para ambientes largos'] },
  { name: 'UA Golden Reverberator',
    pros: ['Spring 65, Plate 140 and Hall 224 verbs', 'Analog dry-through in all modes', 'True or buffered bypass with trails', 'Stereo and dual-mono operation'],
    cons: ['PSU sold separately and it needs 400 mA isolated', 'Deep editing needs the UAFX app', '$399 for three verbs \u2014 flagship pricing', 'No shimmer/reverse weirdness \u2014 classics only'],
    pros_es: ['Spring 65, Plate 140 y Hall 224 de manual', 'Dry anal\u00f3gico en todos los modos', 'True o buffered bypass con trails', 'Operaci\u00f3n est\u00e9reo y dual-mono'],
    cons_es: ['Fuente aparte y pide 400 mA aislados', 'La edici\u00f3n a fondo pide la app UAFX', '399 $ por tres reverbs \u2014 precio flagship', 'Sin rarezas shimmer/reverse \u2014 solo cl\u00e1sicos'] },
  { name: 'Boss RV-200',
    pros: ['12 verbs including Arpverb plus 127 memories', 'Studio spec: 32-bit AD/DA at 96 kHz', 'MIDI, expression and USB control', 'Runs on 3xAA batteries or adapter'],
    cons: ['Deep functions hide behind the Param knob', 'Mini-TRS MIDI and micro-B USB need adapters', '260 mA eats batteries fast', 'No XLR for direct PA use'],
    pros_es: ['12 reverbs con Arpverb m\u00e1s 127 memorias', 'Spec de estudio: 32-bit AD/DA a 96 kHz', 'MIDI, expresi\u00f3n y control USB', 'Funciona con 3xAA o adaptador'],
    cons_es: ['Las funciones a fondo se esconden tras el knob Param', 'MIDI mini-TRS y USB micro-B piden adaptadores', '260 mA devoran las pilas r\u00e1pido', 'Sin XLR para PA directa'] }
];
NV.forEach(v => {
  v.name_es = v.name;
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => { if (v[k].length !== 4) throw new Error(v.name + '.' + k); });
  g.verdictProsCons.push(v);
});
console.log('verdicts added');
// ---------- conclusion ----------
const addEN = ' Hybrid hunters should hear the Keeley Caverns V2 and UA Del-Verb, analog purists get the MXR Carbon Copy, the UA Golden Reverberator nails classic studio verbs, and the Boss RV-200 packs presets and 32-bit sound in a compact box.';
const addES = ' Los cazadores de h\u00edbridos deber\u00edan probar el Keeley Caverns V2 y el UA Del-Verb, los puristas anal\u00f3gicos tienen el MXR Carbon Copy, el UA Golden Reverberator clava las reverbs cl\u00e1sicas de estudio y el Boss RV-200 mete presets y sonido 32-bit en una caja compacta.';
// insert before links paragraph
g.conclusion = g.conclusion.replace(' <p>', addEN + ' <p>');
g.conclusion_es = g.conclusion_es.replace(' <p>', addES + ' <p>');
console.log('conclusion extended');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
