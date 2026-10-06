const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-digital-pianos');
let n = 0;
const rep = (obj, key, from, to, expect) => {
  const c = obj[key].split(from).length - 1;
  if (c !== expect) throw new Error(key + ': found ' + c + 'x, expected ' + expect + ' :: ' + from.slice(0, 60));
  obj[key] = obj[key].split(from).join(to);
  n++;
};

// ---- 1) product id swaps ----
g.sections.forEach(s => { (s.products || []).forEach((id, i) => { if (id === 568) s.products[i] = 573; }); });
g.featuredProducts = g.featuredProducts.map(id => id === 568 ? 573 : id);
console.log('ids swapped');

// ---- 2) console paragraphs ----
const newP_EN = '<p><strong>Yamaha Arius YDP-146</strong> is the most affordable way into a furniture console here: fixed cabinet, sliding key cover and three-pedal unit with half-pedal support around Yamaha\u2019s GHS hammer action \u2014 no escapement simulation, but honest graded weight. CFX sampling with VRM Lite, 192-note polyphony, 10 voices and Bluetooth audio plus MIDI cover home practice, and the 8W+8W system with diffuser grilles is tuned for the living room, not the stage.</p>';
const newP_ES = '<p><strong>Yamaha Arius YDP-146</strong> es la forma m\u00e1s asequible de entrar en un mueble: mueble fijo, tapa deslizante y triple pedalera con medio pedal alrededor de la acci\u00f3n de martillo GHS de Yamaha \u2014 sin simulaci\u00f3n de escape, pero con peso graduado honesto. Muestras del CFX con VRM Lite, 192 notas de polifon\u00eda, 10 voces y Bluetooth audio m\u00e1s MIDI cubren la pr\u00e1ctica en casa, y el sistema de 8W+8W con rejillas difusoras est\u00e1 pensado para el sal\u00f3n, no para el escenario.</p>';
const sec = g.sections.find(s => (s.products || []).includes(573));
const swapPara = (field, marker, np) => {
  const t = sec[field];
  const a = t.indexOf('<p><strong>Kawai KDP120</strong>');
  if (a < 0) throw new Error(field + ': KDP paragraph not found');
  const b = t.indexOf('</p>', a);
  if (b < 0) throw new Error(field + ': paragraph end not found');
  if (!t.slice(a, b).includes(marker)) throw new Error(field + ': marker missing');
  sec[field] = t.slice(0, a) + np + t.slice(b + 4);
};
swapPara('content', 'sits in the middle', newP_EN);
swapPara('content_es', 'ocupa el centro', newP_ES);
console.log('paragraphs swapped');

// ---- 3) model lists ----
g.sections.forEach(s => {
  if (s.content && s.content.includes('RP107, KDP120, YDP-166, CLP-835')) rep(s, 'content', 'RP107, KDP120, YDP-166, CLP-835', 'RP107, YDP-146, YDP-166, CLP-835', 1);
  if (s.content_es && s.content_es.includes('RP107, KDP120, YDP-166, CLP-835')) rep(s, 'content_es', 'RP107, KDP120, YDP-166, CLP-835', 'RP107, YDP-146, YDP-166, CLP-835', 1);
});
const f = g.featuredSnippet;
rep(f, 'faq_a3_en', '(RP107, KDP120, YDP-166, CLP-835)', '(RP107, YDP-146, YDP-166, CLP-835)', 1);
rep(f, 'faq_a3_es', '(RP107, KDP120, YDP-166, CLP-835)', '(RP107, YDP-146, YDP-166, CLP-835)', 1);
rep(f, 'faq_a6_en', 'Bluetooth MIDI (FP-10, KDP120)', 'Bluetooth MIDI (FP-10)', 1);
rep(f, 'faq_a6_es', 'Bluetooth MIDI (FP-10, KDP120)', 'Bluetooth MIDI (FP-10)', 1);
rep(f, 'faq_a6_en', 'RP107, YDP-166 and CLP-835)', 'RP107, YDP-146, YDP-166 and CLP-835)', 1);
rep(f, 'faq_a6_es', 'el RP107, el YDP-166 y el CLP-835)', 'el RP107, el YDP-146, el YDP-166 y el CLP-835)', 1);
console.log('lists + FAQ fixed');

// ---- 4) conclusion + verdict text ----
rep(g, 'conclusion', 'the Roland RP107 is the value console, the Kawai KDP120 brings the strongest touch and loudest speakers, the Yamaha YDP-166 is the classic choice',
  'the Yamaha YDP-146 is the most affordable console, the Roland RP107 brings true escapement feel and 256-note polyphony for the money, the Yamaha YDP-166 is the classic choice', 1);
rep(g, 'conclusion_es', 'el Roland RP107 es el mueble m\u00e1s barato, el Kawai KDP120 aporta el tacto m\u00e1s firme y los altavoces m\u00e1s potentes, el Yamaha YDP-166 es la opci\u00f3n cl\u00e1sica',
  'el Yamaha YDP-146 es el mueble m\u00e1s asequible, el Roland RP107 aporta aut\u00e9ntico escape y 256 notas de polifon\u00eda por su precio, el Yamaha YDP-166 es la opci\u00f3n cl\u00e1sica', 1);
rep(g, 'verdict', 'The RP107 and KDP120 are the value consoles, the YDP-166 the living-room classic, and the CLP-835 the premium step-up.',
  'The YDP-146 is the most affordable console and the RP107 the best-feel value pick, the YDP-166 the living-room classic, and the CLP-835 the premium step-up.', 1);
rep(g, 'verdict_es', 'El RP107 y el KDP120 son los muebles con mejor relaci\u00f3n calidad-precio, el YDP-166 el cl\u00e1sico del sal\u00f3n y el CLP-835 el salto premium.',
  'El YDP-146 es el mueble m\u00e1s asequible y el RP107 la mejor opci\u00f3n por tacto y precio, el YDP-166 el cl\u00e1sico del sal\u00f3n y el CLP-835 el salto premium.', 1);
console.log('conclusion + verdict fixed');

// ---- 5) table ----
const t = g.productTable;
t.columns[5] = { title: 'Yamaha YDP-146', title_es: 'Yamaha YDP-146' };
const colVals = [
  ['Most affordable furniture console', 'Mueble m\u00e1s asequible'],
  ['$1,299.99', '$1,299.99'],
  ['GHS (no escapement)', 'GHS (sin escape)'],
  ['Plastic, matte black', 'Pl\u00e1stico, negro mate'],
  ['192', '192'],
  ['CFX + VRM Lite', 'CFX + VRM Lite'],
  ['Audio + MIDI', 'Audio + MIDI'],
  ['Yes (cabinet + 3 pedals)', 'S\u00ed (mueble + 3 pedales)'],
  ['38 kg', '38 kg']
];
t.rows.forEach((r, i) => {
  r.values[5] = { value: colVals[i][0], value_es: colVals[i][1] };
});
// RP107 Best For no longer cheapest
if (t.rows[0].values[4].value !== 'Cheapest console with three pedals') throw new Error('RP107 bestfor changed');
t.rows[0].values[4] = { value: 'Console with true escapement feel', value_es: 'Mueble con aut\u00e9ntico escape' };
console.log('table fixed');

// ---- 6) verdict entry ----
const vi = g.verdictProsCons.findIndex(v => v.name === 'Kawai KDP120');
if (vi < 0) throw new Error('KDP120 verdict not found');
g.verdictProsCons[vi] = {
  name: 'Yamaha YDP-146', name_es: 'Yamaha YDP-146',
  pros: [
    'CFX concert-grand sampling with VRM Lite resonance in an entry-level cabinet',
    'Bluetooth audio and MIDI plus Smart Pianist app for lessons and play-along',
    'Sliding key cover, half-pedal support and dual headphone jacks for family use',
    'USB audio/MIDI interface (24-bit) for direct recording into a DAW'
  ],
  cons: [
    'GHS action has no escapement simulation \u2014 a clear step below GrandTouch-E',
    '8 W x 2 speakers are modest next to the 20\u201330 W systems here',
    '10 voices only \u2014 piano-focused with no broader palette',
    '38 kg needs a permanent spot; not a piano you move around'
  ],
  pros_es: [
    'Muestras del gran cola CFX con resonancia VRM Lite en un mueble de entrada',
    'Bluetooth audio y MIDI m\u00e1s app Smart Pianist para clases y acompa\u00f1amientos',
    'Tapa deslizante, medio pedal y doble salida de auriculares para toda la familia',
    'Interfaz USB de audio y MIDI (24 bits) para grabar directo en el DAW'
  ],
  cons_es: [
    'La acci\u00f3n GHS no simula el escape \u2014 un escal\u00f3n claro por debajo del GrandTouch-E',
    'Los 8 W x 2 se quedan cortos frente a los sistemas de 20\u201330 W de la gu\u00eda',
    'Solo 10 voces \u2014 repertorio pian\u00edstico sin paleta m\u00e1s amplia',
    'Sus 38 kg piden un sitio fijo; no es un piano para mover'
  ]
};
console.log('verdict replaced');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written, field replaces:', n);
