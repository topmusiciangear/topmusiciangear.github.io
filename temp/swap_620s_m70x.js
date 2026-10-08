const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

// 1. products.json: drop 607, add 608
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
{
  const i = P.findIndex(p => p.id === 607);
  if (i < 0) throw new Error('607 gone');
  assertEq(P[i].title, 'Sennheiser HD 620S', '607 title');
  P.splice(i, 1);
}
P.push({
  id: 608,
  title: 'Audio-Technica ATH-M70x',
  title_es: 'Audio-Technica ATH-M70x',
  brand: 'Audio-Technica',
  category: 'headphones',
  price: 329,
  rating: 4.6,
  reviews: 4200,
  badge: 'premium',
  desc: 'M-Series flagship with 45mm drivers tuned flat from 5 Hz to 40 kHz. 35-ohm impedance, 90-degree swiveling earcups, three detachable cables and metal construction. The upgrade your M50x deserves.',
  desc_es: 'Insignia de la serie M con drivers de 45 mm afinados planos de 5 Hz a 40 kHz. Impedancia de 35 ohmios, copas giratorias 90 grados, tres cables desmontables y construcción metálica. La mejora que tu M50x merece.',
  img: 'https://r2.gear4music.com/media/12/122227/1200/preview_1.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/PA-DJ-and-Lighting/Audio-Technica-ATH-M70x-Professional-Monitoring-Headphones/16LT'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Audio-Technica-ATH-M70X/art-REC0011133-000',
    amazon: 'https://www.amazon.com/dp/B00SC80YLM',
    andertons: 'https://www.andertons.co.uk/audio-technica-ath-m70x-pro-closed-studio-monitor-headphones/',
    zzounds: 'https://www.zzounds.com/a--925521/item--AUTATHM70X'
  }
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products: 607 out, 608 in');

// 2. TEST_SHOP_BTN: drop 607 block, add 608 before 606 (file is CRLF-mixed; operate by markers)
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
{
  const i = bg.indexOf('  607: {');
  if (i < 0) throw new Error('607 TEST gone');
  // block ends at first '\n  },' after i
  const j = bg.indexOf('\n  },', i);
  if (j < 0) throw new Error('607 block end?');
  bg = bg.slice(0, i) + bg.slice(j + '\n  },'.length);
  // remove one leftover blank line / stray comma issues: ensure ',\n\n  606' -> ',\n  606'
  console.log('607 TEST removed');
}
{
  if (bg.includes('  608: {')) throw new Error('608 TEST exists');
  const i606 = bg.indexOf('  606: {');
  if (i606 < 0) throw new Error('606 anchor missing');
  const nb = '  608: {\r\n    prices: {\r\n      gear4music: "£252.00",\r\n      andertons: "£253.00"\r\n    },\r\n    urls: {\r\n      amazon: "https://www.amazon.com/dp/B00SC80YLM",\r\n      zzounds: "https://www.zzounds.com/a--925521/item--AUTATHM70X",\r\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Audio-Technica-ATH-M70X/art-REC0011133-000"\r\n    },\r\n    oos: [\r\n      "andertons"\r\n    ]\r\n  },\r\n';
  bg = bg.slice(0, i606) + nb + bg.slice(i606);
  console.log('608 TEST added');
}
fs.writeFileSync(DIR + 'build-guides.js', bg);

// 3. tracking guide: swap 607 -> 608
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const t = G.find(x => x.id === 'tracking-headphones');
assertEq(t.featuredProducts.includes(607), true, 'feat has 607');
t.featuredProducts = t.featuredProducts.map(id => id === 607 ? 608 : id);
const si = t.sections.findIndex(s => (s.products || []).includes(607));
if (si < 0) throw new Error('620S section?');
t.sections[si] = {
  heading: 'The M-Series Flagship: Is the ATH-M70x the Upgrade Your M50x Deserves?',
  heading_es: 'El insignia de la serie M: ¿es el ATH-M70x la mejora que tu M50x merece?',
  content: '<p><strong>If the M50x is fun, the M70x is truth.</strong> As the flagship of the M-Series, it trades the famous bass lift for a flat, forensic tuning: 45mm drivers stretching 5 Hz to 40 kHz so sub drops and airy highs report honestly. Engineers who outgrew the M50x hype land here and stop shopping.</p><p>Tracking manners are impeccable: 90-degree swiveling earcups for one-ear monitoring, strong isolation that keeps the mix out of the mic, and three detachable cables (coiled, long straight, short straight) so no session dies for a wire. Metal construction and 35 ohms that play loud from anything complete the workhorse brief.</p><p>Honest costs: flagship money for incremental gains over the brilliant M40x, 280 g that you feel by hour six, and a ruthlessly revealing top end that flatters nothing — including your room. For M50x owners ready for the honest version, this is the mandatory upgrade.</p>',
  content_es: '<p><strong>Si los M50x son diversión, los M70x son verdad.</strong> Como insignia de la serie M, cambian el famoso realce de graves por una afinación plana y forense: drivers de 45 mm de 5 Hz a 40 kHz para que los subgraves y los agudos aéreos informen con honestidad. Los ingenieros que superaron la moda de los M50x aterrizan aquí y dejan de buscar.</p><p>Los modales para grabar son impecables: copas giratorias 90 grados para monitoreo a una oreja, aislamiento fuerte que mantiene la mezcla fuera del micrófono y tres cables desmontables (espiral, recto largo, recto corto) para que ninguna sesión muera por un cable. Construcción metálica y 35 ohmios que suenan alto desde todo completan la ficha de caballo de batalla.</p><p>Costes honestos: dinero insignia por mejoras incrementales sobre los brillantes M40x, 280 g que se notan hacia la hora seis y unos agudos implacablemente reveladores que no adulan nada — ni tu sala. Para dueños de M50x listos para la versión honesta, esta es la mejora obligatoria.</p>',
  products: [608]
};
const ci = t.productTable.columns.findIndex(c => c.title === 'Sennheiser HD 620S');
if (ci < 0) throw new Error('620S col?');
t.productTable.columns[ci] = { title: 'Audio-Technica ATH-M70x', title_es: 'Audio-Technica ATH-M70x' };
const vals = [
  ['Best For', 'Flagship M-Series tracking', 'Grabación insignia serie M'],
  ['Estimated Price', '$299–$329', '$299–$329'],
  ['Type', 'Closed-back', 'Cerrados'],
  ['Driver Size', '45mm', '45mm'],
  ['Impedance', '35 Ω', '35 Ω'],
  ['Sensitivity', '97 dB', '97 dB'],
  ['Frequency Response', '5 Hz – 40 kHz', '5 Hz – 40 kHz'],
  ['Cable', 'Detachable (3 included)', 'Desmontable (3 incluidos)'],
  ['Weight', '280 g', '280 g']
];
vals.forEach(([label, en, es]) => {
  const r = t.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  r.values[ci] = { value: en, value_es: es };
});
const vj = t.verdictProsCons.findIndex(v => v.name === 'Sennheiser HD 620S');
if (vj < 0) throw new Error('620S verdict?');
t.verdictProsCons[vj] = {
  name: 'Audio-Technica ATH-M70x',
  name_es: 'Audio-Technica ATH-M70x',
  pros: [
    'Flat flagship tuning catches what the fun-tuned M50x hides',
    '45mm drivers with 5 Hz – 40 kHz honesty for subs and air',
    'Three detachable cables plus swiveling one-ear monitoring',
    'Metal construction and 35 ohms that play loud from anything'
  ],
  pros_es: [
    'La afinación plana insignia caza lo que los divertidos M50x esconden',
    'Drivers de 45 mm con honestidad de 5 Hz a 40 kHz para subs y aire',
    'Tres cables desmontables más monitoreo a una oreja giratorio',
    'Construcción metálica y 35 ohmios que suenan alto desde todo'
  ],
  cons: [
    'Flagship money for incremental gains over the M40x',
    '280 g felt by hour six of tracking',
    'Ruthlessly revealing treble flatters nothing, including your room',
    'Carrying pouch is basic next to hard-case rivals'
  ],
  cons_es: [
    'Dinero insignia por mejoras incrementales sobre los M40x',
    'Los 280 g se notan hacia la hora seis de grabación',
    'Agudos implacablemente reveladores que no adulan nada, ni tu sala',
    'La funda es básica junto a rivales con estuche rígido'
  ]
};
function rep(field, from, to) {
  if (!t[field].includes(from)) throw new Error('no ' + field + ': ' + from.slice(0, 60));
  t[field] = t[field].split(from).join(to);
}
rep('conclusion', 'The Sennheiser HD 620S brings 600-series tone to a sealed cup for leak-free tracking with open manners.', 'The Audio-Technica ATH-M70x is the mandatory M-Series flagship: flat 45mm honesty that catches what the fun-tuned M50x hides.');
rep('conclusion_es', 'Los Sennheiser HD 620S traen el tono de la serie 600 a una copa sellada para grabar sin fuga y con modales abiertos.', 'Los Audio-Technica ATH-M70x son el insignia obligatorio de la serie M: honestidad plana de 45 mm que caza lo que los divertidos M50x esconden.');
rep('verdict', 'and the Sennheiser HD 620S is the open-mannered sealed tracker.', 'and the Audio-Technica ATH-M70x is the mandatory flagship upgrade.');
rep('verdict_es', 'y los Sennheiser HD 620S son el cerrado con modales abiertos.', 'y los Audio-Technica ATH-M70x son la mejora insignia obligatoria.');
const left = JSON.stringify(t).match(/HD 620S|620S/g);
if (left) throw new Error('620S left: ' + JSON.stringify(left.slice(0, 5)));
console.log('tracking: 607->608 done');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
