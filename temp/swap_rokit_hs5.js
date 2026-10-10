const fs = require('fs');

// ============ 1. products.json: add Yamaha HS5 as id 632 ============
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
if (!d.find(x => x.id === 632)) {
  const g4mUrl = 'https://www.gear4music.com/Recording-and-Computers/Yamaha-HS5-Active-Studio-Monitor/QSS';
  const msUrl = 'https://www.musicstore.com/en_OE/EUR/Yamaha-HS-5-5-/art-REC0010557-000';
  d.push({
    id: 632,
    title: 'Yamaha HS5',
    title_es: 'Yamaha HS5',
    brand: 'Yamaha',
    category: 'monitors',
    price: 199,
    rating: 5,
    reviews: 52,
    badge: 'recommended',
    desc: 'The industry-standard 5-inch reference monitor with a brutally honest midrange that makes mixes translate everywhere. Bi-amped 70W power plus Room Control and HIGH TRIM switches tame small-room bass.',
    desc_es: 'El monitor de referencia de 5 pulgadas estándar de la industria, con un rango medio brutalmente honesto que hace que tus mezclas se traduzcan en todas partes. 70W biamplificados e interruptores Room Control y HIGH TRIM que doman los graves de salas pequeñas.',
    img: 'https://r2.gear4music.com/media/26/265478/1200/preview.jpg',
    stores: {
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4mUrl),
      musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent(msUrl),
      andertons: 'https://www.andertons.co.uk/yamaha-hs5-active-studio-monitor-single-unit/',
      zzounds: 'https://www.zzounds.com/a--925521/item--YAMHS5'
    },
    unit: 'each',
    unit_es: 'cada uno'
  });
  fs.writeFileSync('data/products.json', JSON.stringify(d, null, 2) + '\n');
  console.log('products.json: added 632');
} else {
  console.log('products.json: 632 already present');
}

// ============ 2. build-guides.js: add TEST_SHOP_BTN entry 632 ============
let bg = fs.readFileSync('build-guides.js', 'utf8');
if (!/^\s*632:\s*\{/m.test(bg)) {
  const lines = bg.split('\n');
  const startIdx = lines.findIndex(l => /^\s*631:\s*\{/.test(l));
  if (startIdx < 0) throw new Error('631 entry not found');
  let depth = 0, endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    if (depth === 0) { endIdx = i; break; }
  }
  if (endIdx < 0) throw new Error('631 entry end not found');
  const entry = [
    '  632: {',
    '    prices: {',
    '      andertons: "£145.00",',
    '      gear4music: "£152.00",',
    '      zzounds: "$199.99"',
    '    },',
    '    urls: {',
    '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Yamaha-HS5-Active-Studio-Monitor/QSS",',
    '      zzounds: "https://www.zzounds.com/a--925521/item--YAMHS5",',
    '      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-HS-5-5-/art-REC0010557-000"',
    '    }',
    '  },'
  ].join('\n');
  lines.splice(endIdx + 1, 0, entry);
  bg = lines.join('\n');
  fs.writeFileSync('build-guides.js', bg);
  console.log('build-guides.js: added 632 after line ' + (endIdx + 1));
} else {
  console.log('build-guides.js: 632 already present');
}

// ============ 3. guides.json: swap 20 -> 632 in best-monitors-for-small-rooms ============
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
const swapProds = arr => arr.map(id => id === 20 ? 632 : id);
guide.featuredProducts = swapProds(guide.featuredProducts);

const cols = guide.productTable.columns.map(c => c.title);
const CI = cols.indexOf('KRK Rokit 7 G5');
if (CI < 0) throw new Error('Rokit column not found');
guide.productTable.columns[CI] = { title: 'Yamaha HS5', title_es: 'Yamaha HS5' };

const cellSpecs = {
  'Best For': ['Industry-standard mix translation', 'El estándar de la industria para traducción de mezclas'],
  'Estimated Price': ['~$199 each', '~$199 cada uno'],
  'Type': ['2-way bi-amped', 'Biamplificado de 2 vías'],
  'Woofer': ['5" cone', 'Cono de 5"'],
  'Tweeter': ['1" dome', 'Cúpula de 1"'],
  'Power': ['70W (45W LF + 25W HF)', '70W (45W LF + 25W HF)'],
  'Frequency Response': ['54 Hz – 30 kHz (-10 dB)', '54 Hz – 30 kHz (-10 dB)'],
  'Max SPL': ['102 dB', '102 dB'],
  'Dimensions': ['28.5 x 17 x 22.2 cm', '28.5 x 17 x 22.2 cm'],
  'Reflex Port': ['Rear', 'Trasero']
};
guide.productTable.rows.forEach(row => {
  const spec = cellSpecs[row.label];
  if (!spec) { console.log('UNEXPECTED ROW: ' + row.label); return; }
  row.values[CI] = { value: spec[0], value_es: spec[1] };
});
console.log('table: column + 10 rows updated');

// --- sections ---
const R = (s, a, b) => {
  if (!s.includes(a)) console.log('MISS: ' + a.slice(0, 60));
  return s.split(a).join(b);
};

// Sec 0
let s0 = guide.sections[0];
s0.products = swapProds(s0.products);
s0.content = R(s0.content, '(like the KRK Rokit series and JBL 305P MkII)', '(like the JBL 305P MkII and Kali LP-6 V2)');
s0.content = R(s0.content, 'Built-in DSP EQ (like the KRK Rokit G5 series) lets you tune', 'Built-in DSP EQ (like the Neumann KH 80 DSP) lets you tune');
s0.content_es = R(s0.content_es, '(como la serie KRK Rokit y JBL 305P MkII)', '(como el JBL 305P MkII y Kali LP-6 V2)');
s0.content_es = R(s0.content_es, 'La EQ DSP incorporada (como la serie KRK Rokit G5) te permite ajustar', 'La EQ DSP incorporada (como el Neumann KH 80 DSP) te permite ajustar');

// Sec 1: full HS5 rewrite
let s1 = guide.sections[1];
s1.heading = 'Yamaha HS5: The Industry Standard for Mix Translation';
s1.heading_es = 'Yamaha HS5: El estándar de la industria para traducción de mezclas';
s1.products = [632];
s1.content = "<p><strong>The Yamaha HS5 is the industry-standard reference for making mixes translate — the brutally honest 5-inch monitor found in more small studios than any other.</strong> Its flat, unforgiving midrange exposes harshness and mud that flattering monitors hide, so fixes you make on the HS5 hold up on phones, cars and club systems. The 5-inch cone and 1-inch dome, bi-amped at 70W (45W + 25W), deliver 54 Hz – 30 kHz with the famous white-cone NS-10 lineage: if it sounds right here, it sounds right everywhere.</p><p><strong>Why it works in small rooms: </strong>At 28.5 x 17 x 22.2 cm it fits cramped desks, and the rear-panel ROOM CONTROL (-2/-4 dB under 500 Hz) plus HIGH TRIM (±2 dB) switches tame wall-proximity bass without software. The 5-inch woofer moves the right amount of air for a small room instead of exciting modes like a 7-inch does.</p><p><strong>Sound signature: </strong>Flat, forward and honest to a fault — the HS5 flatters nothing, which is why professionals trust it as a second reference even in big studios. Bass heads should note the 54 Hz floor: pair with the HS8S sub or check lows on headphones. At ~$199 each (~$398 a pair), it is the reference standard every small room should be judged against.</p>";
s1.content_es = "<p><strong>El Yamaha HS5 es la referencia estándar de la industria para que tus mezclas se traduzcan bien — el monitor honesto de 5 pulgadas más visto en estudios pequeños.</strong> Su rango medio plano e implacable expone asperezas y embarramiento que los monitores complacientes esconden, así que lo que arreglas en el HS5 se sostiene en móviles, coches y clubs. El cono de 5 pulgadas y la cúpula de 1 pulgada, biamplificados a 70W (45W + 25W), entregan 54 Hz – 30 kHz con el linaje de los míticos conos blancos NS-10: si suena bien aquí, suena bien en todas partes.</p><p><strong>Por qué funciona en salas pequeñas: </strong>Con 28.5 x 17 x 22.2 cm cabe en escritorios apretados, y los interruptores traseros ROOM CONTROL (-2/-4 dB bajo 500 Hz) y HIGH TRIM (±2 dB) doman los graves pegados a la pared sin software. El woofer de 5 pulgadas mueve el aire justo para una sala pequeña en vez de excitar modos como hace uno de 7.</p><p><strong>Firma sonora: </strong>Plana, directa y honesta hasta el extremo — el HS5 no adula nada, por eso los profesionales confían en él como segunda referencia incluso en estudios grandes. Los amantes de los graves notarán el suelo de 54 Hz: combínalo con el sub HS8S o revisa los bajos en auriculares. A ~$199 cada uno (~$398 el par), es el estándar de referencia contra el que debería medirse toda sala pequeña.</p>";

// Sec 3 (Kali)
let s3 = guide.sections[3];
s3.products = swapProds(s3.products);
s3.content = R(s3.content, 'it fills the gap between the 5-inch JBL 305P MkII and the 7-inch KRK Rokit 7 G5 without sacrificing near-wall friendliness', 'it fills the gap between compact 5-inch monitors like the JBL 305P MkII and Yamaha HS5 without sacrificing near-wall friendliness');
s3.content_es = R(s3.content_es, 'llena el hueco entre el JBL 305P MkII de 5 pulgadas y el KRK Rokit 7 G5 de 7 pulgadas sin sacrificar la facilidad de colocación cerca de la pared', 'llena el hueco entre los monitores compactos de 5 pulgadas como el JBL 305P MkII y el Yamaha HS5 sin sacrificar la facilidad de colocación cerca de la pared');

// Sec 12 (treatment, no Rokit text)
guide.sections[12].products = swapProds(guide.sections[12].products);

// --- verdictProsCons: replace Rokit with HS5 ---
const vi = guide.verdictProsCons.findIndex(v => v.name.includes('Rokit'));
if (vi < 0) throw new Error('Rokit verdict not found');
guide.verdictProsCons[vi] = {
  name: 'Yamaha HS5',
  name_es: 'Yamaha HS5',
  pros: [
    'Brutally honest midrange that makes mixes translate everywhere',
    'ROOM CONTROL and HIGH TRIM switches tame wall-proximity bass without software',
    'Compact 28.5 cm cabinet with 5-inch woofer sized right for small rooms',
    '~$199 each — the reference standard at a working-studio price'
  ],
  pros_es: [
    'Rango medio brutalmente honesto que hace que tus mezclas se traduzcan en todas partes',
    'Interruptores ROOM CONTROL y HIGH TRIM que doman los graves pegados a la pared sin software',
    'Gabinete compacto de 28.5 cm con woofer de 5 pulgadas del tamaño justo para salas pequeñas',
    '~$199 cada uno — el estándar de referencia a precio de estudio real'
  ],
  cons: [
    '54 Hz bass floor — needs a subwoofer or headphone checks for deep lows',
    'Rear port demands a few inches of wall clearance',
    'Unforgiving sound can feel harsh during long casual listening',
    'No DSP room correction — tuning is manual switches only'
  ],
  cons_es: [
    'Suelo de graves en 54 Hz — necesita subwoofer o revisar los bajos en auriculares',
    'El puerto trasero exige unos centímetros de distancia a la pared',
    'Su sonido implacable puede resultar duro en escuchas largas por placer',
    'Sin corrección DSP de sala — el ajuste es solo con interruptores manuales'
  ]
};
console.log('verdictProsCons: Rokit -> HS5');

// --- conclusion / verdict / faq / description ---
guide.conclusion = R(guide.conclusion, 'When your room is on the larger side or you mix bass-heavy genres, the KRK Rokit 7 G5 (around $538 a pair) adds DSP room correction.', 'For the industry-standard reference that translates everywhere, the Yamaha HS5 (around $398 a pair) brings brutally honest midrange plus Room Control and HIGH TRIM switches to tame small-room bass.');
guide.conclusion = R(guide.conclusion, ' <a href="/guides/hs8-vs-rokit-7.html" class="guide-link-btn">HS8 vs Rokit 7 G5</a>', '');
guide.conclusion_es = R(guide.conclusion_es, 'Cuando tu sala es más grande o mezclas géneros con muchos graves, los KRK Rokit 7 G5 añaden corrección DSP de sala.', 'Para la referencia estándar que se traduce en todas partes, el Yamaha HS5 (unos $398 el par) aporta un rango medio brutalmente honesto más interruptores Room Control y HIGH TRIM para domar los graves de salas pequeñas.');
guide.conclusion_es = R(guide.conclusion_es, ' <a href="/guides/hs8-vs-rokit-7_es.html" class="guide-link-btn">HS8 vs Rokit 7 G5</a>', '');
guide.verdict = R(guide.verdict, 'For medium rooms or bass-heavy genres like hip-hop and electronic, the KRK Rokit 7 G5 adds DSP room correction.', 'For the reference standard that translates everywhere, the Yamaha HS5 is the honest midrange king with room-tuning switches.');
guide.verdict_es = R(guide.verdict_es, 'Para habitaciones medianas o géneros con muchos graves como hip-hop y electrónica, el KRK Rokit 7 G5 añade corrección DSP de sala.', 'Para la referencia estándar que se traduce en todas partes, el Yamaha HS5 es el rey del rango medio honesto con interruptores de ajuste de sala.');
const sn = guide.featuredSnippet || {};
sn.faq_a3_en = R(sn.faq_a3_en, 'Front-ported monitors (like the KRK Rokit 7 G5 or Kali LP-6 V2) are excellent for small rooms', 'Front-ported monitors (like the Kali LP-6 V2) are excellent for small rooms');
sn.faq_a3_es = R(sn.faq_a3_es, 'El puerto frontal (como el del KRK Rokit 7 G5 o Kali LP-6 V2) es excelente en salas pequeñas', 'El puerto frontal (como el del Kali LP-6 V2) es excelente en salas pequeñas');
sn.faq_a4_en = R(sn.faq_a4_en, 'The KRK Rokit G5 series has built-in DSP.', 'The Neumann KH 80 DSP has built-in DSP room correction.');
sn.faq_a4_es = R(sn.faq_a4_es, 'La serie KRK Rokit G5 tiene DSP incorporado.', 'El Neumann KH 80 DSP trae corrección DSP de sala incorporada.');
guide.description = R(guide.description, 'Kali, JBL, KRK,', 'Kali, JBL, Yamaha,');
guide.description_es = R(guide.description_es, 'Kali, JBL, KRK,', 'Kali, JBL, Yamaha,');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');

// final assert: no Rokit left in this guide
const left = JSON.stringify(guide).split('Rokit').length - 1;
console.log('Remaining Rokit mentions in guide: ' + left);
if (left > 0) throw new Error('Rokit mentions remain!');
console.log('Done.');
