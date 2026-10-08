const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

// 1. products.json: 606
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (P.some(p => p.id === 606)) throw new Error('606 exists');
P.push({
  id: 606,
  title: 'Sennheiser HD 300 Pro',
  title_es: 'Sennheiser HD 300 Pro',
  brand: 'Sennheiser',
  category: 'headphones',
  price: 199,
  rating: 4.6,
  reviews: 640,
  badge: 'recommended',
  desc: 'Closed-back monitoring headphones with linear 6 Hz – 25 kHz response and up to 32 dB of isolation. 64-ohm drivers, viscoelastic pads, coiled cable and fully replaceable parts. Built for stage, broadcast and booth.',
  desc_es: 'Auriculares cerrados de monitoreo con respuesta lineal de 6 Hz a 25 kHz y hasta 32 dB de aislamiento. Drivers de 64 ohmios, almohadillas viscoelásticas, cable en espiral y piezas totalmente reemplazables. Hechos para escenario, broadcast y cabina.',
  img: 'https://r2.gear4music.com/media/38/387768/1200/preview.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-HD-300-PRO-Professional-Monitoring-Headphones/2LC9'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-300-PRO/art-REC0013894-000',
    amazon: 'https://www.amazon.com/dp/B07GZNKB11',
    andertons: 'https://www.andertons.co.uk/sennheiser-hd300-pro-headphones/'
  }
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('606 added');

// 2. TEST_SHOP_BTN 606 (append after 605 block; file is CRLF - use index math)
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
if (bg.includes('  606: {')) throw new Error('606 TEST exists');
const i605 = bg.indexOf('  605: {');
if (i605 < 0) throw new Error('605 anchor missing');
// find start of next entry line after 605 block: search '\n  604: {' after i605
const nxt = bg.indexOf('\n  604: {', i605);
if (nxt < 0) throw new Error('604-after-605 anchor missing');
const nb = '  606: {\r\n    prices: {\r\n      amazon: "$186.78",\r\n      andertons: "£145.00",\r\n      gear4music: "£148.50"\r\n    },\r\n    urls: {\r\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-300-PRO/art-REC0013894-000"\r\n    }\r\n  },\r\n';
bg = bg.slice(0, i605) + nb + bg.slice(i605);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('606 TEST added');

// 3. tracking-headphones: +606, nine->ten
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const t = G.find(x => x.id === 'tracking-headphones');
assertEq(t.featuredProducts.includes(606), false, '606 not yet');
t.featuredProducts.push(606);
t.sections.push({
  heading: 'Broadcast Bloodline: Is the HD 300 Pro the Stage-Tracking Specialist?',
  heading_es: 'Linaje broadcast: ¿es el HD 300 Pro el especialista para grabar en escenario?',
  content: '<p><strong>When the red light is on in front of an audience, this is the Sennheiser crews reach for.</strong> The HD 300 Pro pairs a linear 6 Hz – 25 kHz response with up to 32 dB of passive isolation, so monitor mixes stay clean on loud stages, in OB trucks and in orchestral pits. Viscoelastic pads seal deep without hotspots, and structure-borne handling noise is filtered at the earpiece.</p><p>The 64-ohm drivers run loud from any desk or portable rig, the coiled cable keeps slack out of the way, and every wearable part — cable, pads, headband padding — is field-replaceable. At 297 g it stays put through long broadcast shifts.</p><p>Honest limits: the 1.55 m coiled cable is short for studio roaming, the clamp is firm by design, and it costs notably more than the HD 280 Pro II for incremental gains. For stage tracking, broadcast and FOH monitoring where failure is not an option, it is the specialist pick.</p>',
  content_es: '<p><strong>Cuando la luz roja se enciende frente al público, este es el Sennheiser que usan los equipos.</strong> El HD 300 Pro combina una respuesta lineal de 6 Hz a 25 kHz con hasta 32 dB de aislamiento pasivo, así las mezclas de monitoreo se mantienen limpias en escenarios ruidosos, unidades móviles y fosos de orquesta. Las almohadillas viscoelásticas sellan a fondo sin puntos calientes, y el ruido estructural se filtra en la copa.</p><p>Los drivers de 64 ohmios suenan alto desde cualquier mesa o equipo portátil, el cable en espiral mantiene el sobrante fuera del camino y cada pieza de desgaste — cable, almohadillas, diadema — es reemplazable en campo. Con 297 g se queda en su sitio en turnos largos de broadcast.</p><p>Límites honestos: el cable en espiral de 1,55 m es corto para moverse por el estudio, la presión es firme por diseño y cuesta notablemente más que el HD 280 Pro II por mejoras incrementales. Para grabar en escenario, broadcast y monitoreo FOH donde fallar no es opción, es la elección especialista.</p>',
  products: [606]
});
assertEq(t.productTable.columns.length, 9, 'track cols');
t.productTable.columns.push({ title: 'Sennheiser HD 300 Pro', title_es: 'Sennheiser HD 300 Pro' });
function col(label, en, es) {
  const r = t.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 9, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Best For', 'High-isolation stage tracking', 'Grabar en escenario con máximo aislamiento');
col('Estimated Price', '$186–$199', '$186–$199');
col('Type', 'Closed-back', 'Cerrados');
col('Driver Size', '—', '—');
col('Impedance', '64 Ω', '64 Ω');
col('Sensitivity', '108 dB', '108 dB');
col('Frequency Response', '6 Hz – 25 kHz', '6 Hz – 25 kHz');
col('Cable', 'Coiled 1.55 m', 'Espiral 1,55 m');
col('Weight', '297 g', '297 g');
t.verdictProsCons.push({
  name: 'Sennheiser HD 300 Pro',
  name_es: 'Sennheiser HD 300 Pro',
  pros: [
    'Up to 32 dB of isolation for loud stages, OB trucks and pits',
    'Linear 6 Hz – 25 kHz response trusted for broadcast monitoring',
    'Viscoelastic pads seal deep without hotspots',
    'Every wearable part is field-replaceable'
  ],
  pros_es: [
    'Hasta 32 dB de aislamiento para escenarios ruidosos, móviles y fosos',
    'Respuesta lineal de 6 Hz a 25 kHz de confianza para monitoreo broadcast',
    'Las almohadillas viscoelásticas sellan a fondo sin puntos calientes',
    'Cada pieza de desgaste es reemplazable en campo'
  ],
  cons: [
    'Short 1.55 m coiled cable limits studio roaming',
    'Firm clamp is tiring until broken in',
    'Costs notably more than the HD 280 Pro II for incremental gains',
    'Plain styling next to flagship rivals'
  ],
  cons_es: [
    'El corto cable en espiral de 1,55 m limita moverse por el estudio',
    'La presión firme cansa hasta adaptarse',
    'Cuesta notablemente más que el HD 280 Pro II por mejoras incrementales',
    'Estética sobria junto a rivales insignia'
  ]
});
const conFrom = 'Together, these nine headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.';
if (!t.conclusion.includes(conFrom)) throw new Error('con anchor');
t.conclusion = t.conclusion.replace(conFrom, 'The Sennheiser HD 300 Pro is the stage-and-broadcast specialist with up to 32 dB of isolation and field-replaceable everything. Together, these ten headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.');
const conEsFrom = 'Juntos, estos nueve auriculares cubren cada escenario de grabación.';
if (!t.conclusion_es.includes(conEsFrom)) throw new Error('con es anchor');
t.conclusion_es = t.conclusion_es.replace(conEsFrom, 'Los Sennheiser HD 300 Pro son el especialista de escenario y broadcast con hasta 32 dB de aislamiento y todo reemplazable en campo. Juntos, estos diez auriculares cubren cada escenario de grabación.');
const verFrom = 'and the Neumann NDH 20 is the premium endgame.';
if (!t.verdict.includes(verFrom)) throw new Error('verdict anchor');
t.verdict = t.verdict.replace(verFrom, 'the Neumann NDH 20 is the premium endgame, and the Sennheiser HD 300 Pro is the stage-and-broadcast specialist.');
const verEsFrom = 'y el Neumann NDH 20 es la gama premium definitiva.';
if (!t.verdict_es.includes(verEsFrom)) throw new Error('verdict es anchor');
t.verdict_es = t.verdict_es.replace(verEsFrom, 'el Neumann NDH 20 es la gama premium definitiva, y los Sennheiser HD 300 Pro son el especialista de escenario y broadcast.');
const left = JSON.stringify(t).match(/nine headphones|nueve auriculares/g);
if (left) throw new Error('nine left: ' + JSON.stringify(left));
console.log('tracking: 606 added');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
