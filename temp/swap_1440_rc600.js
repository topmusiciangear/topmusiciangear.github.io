const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// --- products.json: delete 589, add 600+601 (skip if already applied) ---
const pFile = DIR + 'data/products.json';
let P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
if (!P.some(x => x.id === 600)) {
if (!P.some(x => x.id === 589)) throw new Error('589 missing?');
P = P.filter(x => x.id !== 589);
[600, 601].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' exists'); });
P.push({ id: 600, title: 'Electro-Harmonix 1440 Stereo Looper', title_es: 'Electro-Harmonix 1440 Stereo Looper',
  brand: 'Electro-Harmonix', category: 'pedals', price: 263.10,
  desc: 'EHX\u2019s compact stereo workstation: 24 minutes across 20 loops, unlimited overdubs, reverse and octave FX, 1-Shot playback, MIDI sync, USB backup app and included adapter.',
  desc_es: 'La estaci\u00f3n est\u00e9reo compacta de EHX: 24 minutos en 20 loops, overdubs ilimitados, FX reverse y octava, playback 1-Shot, MIDI sync, app backup USB y adaptador incluido.',
  img: 'https://r2.gear4music.com/media/98/989561/1200/preview.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--EHXSNCO03E',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Electro-Harmonix-1440-Stereo-Looper/5XK9' } });
P.push({ id: 601, title: 'Boss RC-600 Loop Station', title_es: 'Boss RC-600 Loop Station',
  brand: 'Boss', category: 'pedals', price: 659.99,
  desc: 'Boss\u2019s flagship floor looper: six stereo tracks with 32-bit audio, nine assignable footswitches, dual XLR inputs with phantom power, 200+ rhythms, 49 input FX plus 53 track FX, 99 memories, MIDI and USB.',
  desc_es: 'El looper insignia de suelo de Boss: seis pistas est\u00e9reo con audio 32 bits, nueve footswitches asignables, doble XLR con fantasma, m\u00e1s de 200 ritmos, 49 FX de entrada m\u00e1s 53 de pista, 99 memorias, MIDI y USB.',
  img: 'https://static.roland.com/assets/images/products/main/rc-600_main.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--BOSRC600' } });
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('589 deleted, 600+601 added');
}
// --- TEST_SHOP_BTN ---
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  599: { prices: { zzounds: "$320.99", gear4music: "£243.00" } },';
if (!s.includes(anchor)) throw new Error('599 anchor not found');
if (!s.includes('  600: {')) s = s.replace(anchor, anchor
  + eol + '  600: { prices: { gear4music: "£241.00" }, urls: { zzounds: "https://www.zzounds.com/item--EHXSNCO03E" }, oos: ["zzounds"] },'
  + eol + '  601: { prices: { zzounds: "$659.99" } },');
fs.writeFileSync(bFile, s);
console.log('600+601 added to TEST_SHOP_BTN');
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
['600', '601'].forEach(k => { if (v.includes("'" + k + "'")) console.log(k + ' already whitelisted (skip)'); });
if (!v.includes("'600'")) v = v.replace("'598', '599']", "'598', '599', '600', '601']");
fs.writeFileSync(vFile, v);
console.log('600+601 whitelisted');
// --- guide surgery ---
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-looper-pedals');
const V = (value, value_es) => ({ value, value_es });
// remove Infinity section
const si = g.sections.findIndex(x => JSON.stringify(x.products) === '[589]');
if (si < 0) throw new Error('589 section not found');
g.sections.splice(si, 1);
// featured
g.featuredProducts = [200, 201, 586, 587, 588, 590, 600, 601];
// table: verify idx5 is Infinity, replace with 1440, append RC-600
const col5 = g.productTable.columns[5];
if (col5.title !== 'Pigtronix Infinity 2') throw new Error('col5 is ' + col5.title);
g.productTable.columns[5] = { title: 'Electro-Harmonix 1440 Stereo Looper', title_es: 'Electro-Harmonix 1440 Stereo Looper' };
const vals1440 = {
  'Best For': V('Stereo looping, 20 memories', 'Looping estéreo, 20 memorias'),
  'Estimated Price': V('$263.10', '$263.10'),
  'Type': V('Stereo Looper', 'Looper Estéreo'),
  'Controls': V('Footswitches + knobs', 'Footswitches + perillas'),
  'Bypass': V('Buffered', 'Buffered'),
  'Power': V('9V DC (adapter included)', '9V DC (adaptador incluido)'),
  'Current Draw': V('150 mA', '150 mA'),
  'Size': V('121 x 105 x 57 mm', '121 x 105 x 57 mm'),
  'Standout Feature': V('24 mins, 20 loops, MIDI sync', '24 min, 20 loops, MIDI sync')
};
const vals600 = {
  'Best For': V('Pro 6-track looping workstation', 'Estación looping pro 6 pistas'),
  'Estimated Price': V('$659.99', '$659.99'),
  'Type': V('Multi-track Looper', 'Looper Multi-pista'),
  'Controls': V('9 footswitches + 4 knobs + display', '9 footswitches + 4 perillas + display'),
  'Bypass': V('Buffered', 'Buffered'),
  'Power': V('AC adapter included', 'Adaptador AC incluido'),
  'Current Draw': V('1100 mA', '1100 mA'),
  'Size': V('435 x 163 x 66 mm', '435 x 163 x 66 mm'),
  'Standout Feature': V('6 tracks, 9 switches, 200+ rhythms', '6 pistas, 9 switches, 200+ ritmos')
};
g.productTable.rows.forEach(r => {
  if (!(r.label in vals1440)) throw new Error('unknown row ' + r.label);
  if (r.values.length !== 8) throw new Error('row ' + r.label + ' has ' + r.values.length);
  r.values[5] = vals1440[r.label];
  r.values.push(vals600[r.label]);
});
g.productTable.columns.push({ title: 'Boss RC-600 Loop Station', title_es: 'Boss RC-600 Loop Station' });
console.log('table rebuilt: ' + g.productTable.columns.length + ' cols');
// verdicts: replace Infinity with 1440, append RC-600
const vi = g.verdictProsCons.findIndex(x => x.name === 'Pigtronix Infinity 2');
if (vi < 0) throw new Error('Infinity verdict not found');
g.verdictProsCons[vi] = { name: 'Electro-Harmonix 1440 Stereo Looper', name_es: 'Electro-Harmonix 1440 Stereo Looper',
  pros: ['24 minutes stereo, 20 loops', 'Reverse + octave FX, 1-Shot playback', 'MIDI sync, USB backup app', 'Compact, adapter included'],
  cons: ['Single track only', 'No built-in rhythms', 'No XLR input', 'Bigger than pocket loopers'],
  pros_es: ['24 min estéreo, 20 loops', 'FX reverse + octava, playback 1-Shot', 'MIDI sync, app backup USB', 'Compacto, adaptador incluido'],
  cons_es: ['Una sola pista', 'Sin ritmos integrados', 'Sin entrada XLR', 'Más grande que loopers de bolsillo'] };
g.verdictProsCons.push({ name: 'Boss RC-600 Loop Station', name_es: 'Boss RC-600 Loop Station',
  pros: ['6 stereo tracks, 32-bit audio', '9 assignable footswitches', '200+ rhythms, 16 kits, deep FX', 'Dual XLR with phantom power'],
  cons: ['Very expensive', 'Large and heavy (2.4 kg)', 'Deep menus, steep learning curve', 'Overkill for simple looping'],
  pros_es: ['6 pistas estéreo, audio 32 bits', '9 footswitches asignables', 'Más de 200 ritmos, 16 kits, FX profundos', 'Doble XLR con fantasma'],
  cons_es: ['Muy caro', 'Grande y pesado (2,4 kg)', 'Menús profundos, curva pronunciada', 'Excesivo para looping simple'] });
console.log('verdicts rebuilt: ' + g.verdictProsCons.length);
// sections
const SEC = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });
g.sections.push(SEC(
  '24 Minutes, 20 Loops, One Box: EHX 1440',
  '24 minutos, 20 loops, una caja: EHX 1440',
  '<strong>Twenty-four minutes across twenty loops in a compact box: the 1440 is EHX stereo looping grown up.</strong> Unlimited overdubs, reverse and octave FX, 1-Shot playback and MIDI sync cover writing and stage, with USB backup via the Loop Manager app and included adapter. Players who outgrew the 720 and want memories live here. The trade-off: single-track limits and no built-in rhythms.',
  '<strong>Veinticuatro minutos en veinte loops y caja compacta: el 1440 es el looping estéreo EHX crecido.</strong> Overdubs ilimitados, FX reverse y octava, playback 1-Shot y MIDI sync cubren composición y directo, con backup USB vía app Loop Manager y adaptador incluido. Aquí viven quienes superaron el 720 y quieren memorias. A cambio: límite de una pista y sin ritmos integrados.',
  [600]
));
g.sections.push(SEC(
  'Six Tracks, Nine Switches, Zero Compromise: RC-600',
  'Seis pistas, nueve switches, cero concesiones: RC-600',
  '<strong>The flagship floor looper, full stop: six stereo tracks, nine assignable switches and 32-bit audio.</strong> Dual XLR inputs with phantom power, 200+ rhythms with 16 kits, 49 input FX plus 53 track FX, 99 memories, MIDI and USB cover the biggest solo shows. AC powered at 1.1A and 2.4kg of pro workstation. Full-time looping artists live here. The trade-off: price, size and menu depth.',
  '<strong>El looper insignia de suelo, punto: seis pistas estéreo, nueve switches asignables y audio 32 bits.</strong> Doble XLR con fantasma, más de 200 ritmos con 16 kits, 49 FX de entrada más 53 de pista, 99 memorias, MIDI y USB cubren los shows en solitario más grandes. AC a 1,1 A y 2,4 kg de estación pro. Aquí viven artistas del looping a tiempo completo. A cambio: precio, tamaño y menús.',
  [601]
));
console.log('2 sections added');
// verdict + conclusion text already handled by fix_lp_text.js
G[G.findIndex(x => x.id === 'best-looper-pedals')] = g;
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
