const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (P.some(p => p.id === 607)) throw new Error('607 exists');
P.push({
  id: 607,
  title: 'Sennheiser HD 620S',
  title_es: 'Sennheiser HD 620S',
  brand: 'Sennheiser',
  category: 'headphones',
  price: 299,
  rating: 4.2,
  reviews: 307,
  badge: 'recommended',
  desc: 'Closed-back with HD 600-series DNA: 42mm angled drivers, 150-ohm voice coil and open baffle for speaker-like imaging without the leak. Natural, airy detail that stays out of the mic.',
  desc_es: 'Cerrado con ADN de la serie HD 600: drivers angulares de 42 mm, bobina de 150 ohmios y bafle abierto para imagen de altavoz sin fuga. Detalle natural y aireado que no se mete en el micrófono.',
  img: 'https://m.media-amazon.com/images/I/51w2J0eEbKL._AC_SL1500_.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0D38B6XWR'
  }
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('607 added');

let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
if (bg.includes('  607: {')) throw new Error('607 TEST exists');
const i606 = bg.indexOf('  606: {');
if (i606 < 0) throw new Error('606 anchor missing');
const nxt = bg.indexOf('\n  605: {', i606);
if (nxt < 0) throw new Error('605-after-606 anchor missing');
const nb = '  607: {\r\n    prices: {\r\n      amazon: "$269.99"\r\n    }\r\n  },\r\n';
bg = bg.slice(0, i606) + nb + bg.slice(i606);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('607 TEST added');

const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const t = G.find(x => x.id === 'tracking-headphones');
assertEq(t.featuredProducts.includes(607), false, '607 new');
t.featuredProducts.push(607);
t.sections.push({
  heading: 'Closed, Yet Open: Is the HD 620S the 600-Series Sound Without the Leak?',
  heading_es: 'Cerrado, pero abierto: ¿es el HD 620S el sonido 600 sin fuga?',
  content: '<p><strong>Sennheiser finally answered the decade-long request: a closed-back with 600-series DNA.</strong> The 42mm angled drivers on an open baffle deliver the natural tone and speaker-like imaging of the HD 600 line, while the sealed cups keep your mix out of the microphone — tracking with open-back manners and closed-back discretion.</p><p>The 150-ohm aluminum voice coil resolves vocals, breaths and doubled-take timing with analytical ease, and the lightweight 326 g frame with vented pads stays comfortable for hours. A detachable 1.8 m cable and steel-reinforced sliders complete a road-worthy package.</p><p>Keep expectations honest: passive isolation is only average — loud rooms push through, so this is not the pick for drummers or FOH pits. Bass stays lean and polite where modern pop and EDM want weight, and 150 ohms appreciates a decent source. For vocal tracking and editing where tone matters more than brute isolation, it is the thinking engineer\u2019s closed-back.</p>',
  content_es: '<p><strong>Sennheiser por fin respondió al pedido de una década: un cerrado con ADN de la serie 600.</strong> Los drivers angulares de 42 mm sobre bafle abierto entregan el tono natural y la imagen de altavoz de la línea HD 600, mientras las copas selladas mantienen tu mezcla fuera del micrófono — grabar con modales de abierto y discreción de cerrado.</p><p>La bobina de aluminio de 150 ohmios resuelve voces, respiraciones y tiempos de doblajes con facilidad analítica, y el chasis ligero de 326 g con almohadillas ventiladas se mantiene cómodo por horas. Un cable desmontable de 1,8 m y deslizadores reforzados con acero completan un conjunto rutero.</p><p>Mantén las expectativas honestas: el aislamiento pasivo es solo promedio — las salas ruidosas se cuelan, así no es la elección para baterías o fosos FOH. Los graves se mantienen sobrios y educados donde el pop moderno y el EDM piden peso, y los 150 ohmios agradecen una fuente decente. Para grabar voces y editar donde el tono importa más que el aislamiento bruto, es el cerrado del ingeniero pensante.</p>',
  products: [607]
});
assertEq(t.productTable.columns.length, 10, 'track cols');
t.productTable.columns.push({ title: 'Sennheiser HD 620S', title_es: 'Sennheiser HD 620S' });
function col(label, en, es) {
  const r = t.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 10, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Best For', 'Open-like closed tracking', 'Grabar en cerrado con aire abierto');
col('Estimated Price', '~$269', '~$269');
col('Type', 'Closed-back', 'Cerrados');
col('Driver Size', '42mm', '42mm');
col('Impedance', '150 Ω', '150 Ω');
col('Sensitivity', '110 dB', '110 dB');
col('Frequency Response', '6 Hz – 30 kHz', '6 Hz – 30 kHz');
col('Cable', 'Detachable 1.8 m', 'Desmontable 1,8 m');
col('Weight', '326 g', '326 g');
t.verdictProsCons.push({
  name: 'Sennheiser HD 620S',
  name_es: 'Sennheiser HD 620S',
  pros: [
    '600-series natural tone and speaker-like imaging in a sealed cup',
    'Leak-free tracking — the mix stays out of the microphone',
    'Analytical detail for vocals, breaths and doubled takes',
    'Light 326 g frame with vented pads for long sessions'
  ],
  pros_es: [
    'Tono natural de la serie 600 e imagen de altavoz en copa sellada',
    'Grabación sin fuga — la mezcla se queda fuera del micrófono',
    'Detalle analítico para voces, respiraciones y doblajes',
    'Chasis ligero de 326 g con almohadillas ventiladas para sesiones largas'
  ],
  cons: [
    'Passive isolation is only average — loud rooms push through',
    'Lean polite bass underwhelms modern pop and EDM',
    '150 ohms appreciates a decent source over a weak jack',
    'Plain 500-series styling next to the price tag'
  ],
  cons_es: [
    'El aislamiento pasivo es solo promedio — las salas ruidosas se cuelan',
    'Graves sobrios y educados que decepcionan en pop moderno y EDM',
    'Los 150 ohmios agradecen una fuente decente en vez de una salida floja',
    'Estética sobria de serie 500 junto al precio'
  ]
});
const conFrom = 'Together, these ten headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.';
if (!t.conclusion.includes(conFrom)) throw new Error('con anchor');
t.conclusion = t.conclusion.replace(conFrom, 'The Sennheiser HD 620S brings 600-series tone to a sealed cup for leak-free tracking with open manners. Together, these eleven headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.');
const conEsFrom = 'Juntos, estos diez auriculares cubren cada escenario de grabación.';
if (!t.conclusion_es.includes(conEsFrom)) throw new Error('con es anchor');
t.conclusion_es = t.conclusion_es.replace(conEsFrom, 'Los Sennheiser HD 620S traen el tono de la serie 600 a una copa sellada para grabar sin fuga y con modales abiertos. Juntos, estos once auriculares cubren cada escenario de grabación.');
const verFrom = 'and the Sennheiser HD 300 Pro is the stage-and-broadcast specialist.';
if (!t.verdict.includes(verFrom)) throw new Error('verdict anchor');
t.verdict = t.verdict.replace(verFrom, 'the Sennheiser HD 300 Pro is the stage-and-broadcast specialist, and the Sennheiser HD 620S is the open-mannered sealed tracker.');
const verEsFrom = 'y los Sennheiser HD 300 Pro son el especialista de escenario y broadcast.';
if (!t.verdict_es.includes(verEsFrom)) throw new Error('verdict es anchor');
t.verdict_es = t.verdict_es.replace(verEsFrom, 'los Sennheiser HD 300 Pro son el especialista de escenario y broadcast, y los Sennheiser HD 620S son el cerrado con modales abiertos.');
const left = JSON.stringify(t).match(/ten headphones|diez auriculares/g);
if (left) throw new Error('ten left: ' + JSON.stringify(left));
console.log('tracking: 607 added');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
