const fs = require('fs');

// ============ 1. products.json: add KRK Rokit 5 G5 as id 633 ============
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
if (!d.find(x => x.id === 633)) {
  const g4mUrl = 'https://www.gear4music.com/Recording-and-Computers/KRK-ROKIT-RP5-G5-Studio-Monitor-Single/674P';
  const msUrl = 'https://www.musicstore.com/en_OE/EUR/KRK-Rokit-RP5-G5/art-REC0016599-000';
  d.push({
    id: 633,
    title: 'KRK Rokit 5 G5',
    title_es: 'KRK Rokit 5 G5',
    brand: 'KRK',
    category: 'monitors',
    price: 199,
    badge: 'recommended',
    desc: '5-inch DSP-powered studio monitor with front-firing port, rear LCD with 25 boundary/EQ combos and three voicings (Mix, Focus, Create). Kevlar woofer, 55W Class-D, made for placement against the wall.',
    desc_es: 'Monitor de estudio de 5 pulgadas con DSP, puerto frontal, LCD trasera con 25 combinaciones Boundary/EQ y tres modos (Mix, Focus, Create). Woofer de Kevlar, 55W en Clase-D, hecho para pegarlo a la pared.',
    img: 'https://r2.gear4music.com/media/104/1046887/1200/preview.jpg',
    stores: {
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4mUrl),
      musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent(msUrl),
      zzounds: 'https://www.zzounds.com/a--925521/item--KRKRP5G5NA'
    },
    unit: 'each',
    unit_es: 'cada uno'
  });
  fs.writeFileSync('data/products.json', JSON.stringify(d, null, 2) + '\n');
  console.log('products.json: added 633');
} else {
  console.log('products.json: 633 already present');
}

// ============ 2. build-guides.js: add TEST_SHOP_BTN entry 633 ============
let bg = fs.readFileSync('build-guides.js', 'utf8');
if (!/^\s*633:\s*\{/m.test(bg)) {
  const lines = bg.split('\n');
  const startIdx = lines.findIndex(l => /^\s*632:\s*\{/.test(l));
  if (startIdx < 0) throw new Error('632 entry not found');
  let depth = 0, endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    if (depth === 0) { endIdx = i; break; }
  }
  if (endIdx < 0) throw new Error('632 entry end not found');
  const entry = [
    '  633: {',
    '    prices: {',
    '      gear4music: "£141.00",',
    '      zzounds: "$199.00",',
    '      musicstore: "€195.00"',
    '    },',
    '    urls: {',
    '      gear4music: "https://www.gear4music.com/Recording-and-Computers/KRK-ROKIT-RP5-G5-Studio-Monitor-Single/674P",',
    '      zzounds: "https://www.zzounds.com/a--925521/item--KRKRP5G5NA",',
    '      musicstore: "https://www.musicstore.com/en_OE/EUR/KRK-Rokit-RP5-G5/art-REC0016599-000"',
    '    }',
    '  },'
  ].join('\n');
  lines.splice(endIdx + 1, 0, entry);
  bg = lines.join('\n');
  fs.writeFileSync('build-guides.js', bg);
  console.log('build-guides.js: added 633');
} else {
  console.log('build-guides.js: 633 already present');
}

// ============ 3. guides.json: add to best-monitors-for-small-rooms ============
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
if (!guide.featuredProducts.includes(633)) guide.featuredProducts.push(633);

guide.productTable.columns.push({ title: 'KRK Rokit 5 G5', title_es: 'KRK Rokit 5 G5' });
const cellSpecs = {
  'Best For': ['DSP-tuned mixing against the wall', 'Mezcla con DSP pegada a la pared'],
  'Estimated Price': ['~$199 each', '~$199 cada uno'],
  'Type': ['2-way bi-amped, DSP', 'Biamplificado de 2 vías, DSP'],
  'Woofer': ['5" Kevlar', '5" de Kevlar'],
  'Tweeter': ['1" silk dome', '1" de cúpula de seda'],
  'Power': ['55W RMS (35W LF + 20W HF)', '55W RMS (35W LF + 20W HF)'],
  'Frequency Response': ['54 Hz – 30 kHz (±3 dB)', '54 Hz – 30 kHz (±3 dB)'],
  'Max SPL': ['104 dB', '104 dB'],
  'Dimensions': ['11.3 x 7.5 x 9.5 in', '28.8 x 19.1 x 24.2 cm'],
  'Reflex Port': ['Front', 'Frontal']
};
guide.productTable.rows.forEach(row => {
  const spec = cellSpecs[row.label];
  if (!spec) { console.log('UNEXPECTED ROW: ' + row.label); return; }
  row.values.push({ value: spec[0], value_es: spec[1] });
});
console.log('table: column + 10 rows added');

// new section before treatment (last section)
const newSec = {
  heading: 'KRK Rokit 5 G5: DSP Room Tuning on a Budget',
  heading_es: 'KRK Rokit 5 G5: afinación DSP de sala con poco presupuesto',
  content: "<p><strong>The only monitor under $400 a pair with a rear LCD, DSP room tuning and three voicings in one box.</strong> The Rokit 5 G5 pairs a 5-inch Kevlar woofer with a 1-inch silk-dome tweeter, bi-amped at 55W Class-D, delivering 54 Hz – 30 kHz with the flat Mix voicing plus Focus (mid-forward) and Create (inspiring) modes — three monitors in one for writing, checking mids and final mixing.</p><p><strong>Why it works in small rooms: </strong>The front-firing slot port sits inches from the wall without muddy bass, and 25 boundary/EQ combinations plus the KRK App dial out room modes without extra software. At 28.8 x 19.1 x 24.2 cm it fits cramped desks while moving enough air for honest low-end calls.</p><p><strong>Sound signature: </strong>Flat and precise in Mix mode — a different animal from the bass-hyped KRKs of old — with Focus mode exposing vocal-range problems other monitors gloss over. The 5-inch cone runs out of steam below 54 Hz, so check sub lows on headphones. At ~$199 each (~$398 a pair), no rival packs DSP, three voicings and a front port for less.</p>",
  content_es: "<p><strong>El único monitor por menos de $400 el par con LCD trasera, afinación DSP de sala y tres modos en una sola caja.</strong> El Rokit 5 G5 junta un woofer de Kevlar de 5 pulgadas con una cúpula de seda de 1 pulgada, biamplificados a 55W en Clase-D, entregando 54 Hz – 30 kHz con el modo plano Mix más los modos Focus (medios al frente) y Create (inspirador) — tres monitores en uno para componer, revisar medios y mezclar de verdad.</p><p><strong>Por qué funciona en salas pequeñas: </strong>El puerto ranurado frontal se pega a la pared sin embarrar los graves, y 25 combinaciones Boundary/EQ más la KRK App eliminan los modos de sala sin software extra. Con 28.8 x 19.1 x 24.2 cm cabe en escritorios apretados moviendo aire suficiente para decidir graves con honestidad.</p><p><strong>Firma sonora: </strong>Plano y preciso en modo Mix — otra especie frente a los KRK antiguos de graves inflados — con el modo Focus exponiendo problemas vocales que otros monitores disimulan. El cono de 5 pulgadas se queda sin fuelle bajo 54 Hz, así que revisa los subgraves en auriculares. A ~$199 cada uno (~$398 el par), ningún rival mete DSP, tres modos y puerto frontal por menos.</p>",
  products: [633]
};
guide.sections.splice(guide.sections.length - 1, 0, newSec);
console.log('section added at index ' + (guide.sections.length - 2));

guide.verdictProsCons.push({
  name: 'KRK Rokit 5 G5',
  name_es: 'KRK Rokit 5 G5',
  pros: [
    'Front-firing slot port for wall-close placement without muddy bass',
    'Rear LCD with 25 boundary/EQ combos plus KRK App tames room modes',
    'Three voicings (Mix, Focus, Create) cover writing, midrange checks and final mixing',
    '~$199 each — DSP tuning no rival offers under $400 a pair'
  ],
  pros_es: [
    'Puerto ranurado frontal para pegarlo a la pared sin embarrar los graves',
    'LCD trasera con 25 combinaciones Boundary/EQ más KRK App que doma los modos de sala',
    'Tres modos (Mix, Focus, Create) que cubren componer, revisar medios y mezclar de verdad',
    '~$199 cada uno — afinación DSP que ningún rival ofrece por menos de $400 el par'
  ],
  cons: [
    '5-inch cone fades below 54 Hz — check deep lows on headphones',
    'Rear-panel LCD and data knob are fiddly in dark racks',
    '4.95 kg — heavier than the JBL 305P MkII',
    'Focus and Create modes can mislead if you forget to switch back to Mix'
  ],
  cons_es: [
    'El cono de 5 pulgadas se apaga bajo 54 Hz — revisa los graves profundos en auriculares',
    'La LCD trasera y su rueda son engorrosas en racks oscuros',
    '4.95 kg — más pesado que el JBL 305P MkII',
    'Los modos Focus y Create pueden engañar si olvidas volver a Mix'
  ]
});
console.log('verdictProsCons added');

const R = (s, a, b) => {
  if (!s.includes(a)) console.log('MISS: ' + a.slice(0, 70));
  return s.split(a).join(b);
};
guide.conclusion = R(guide.conclusion, 'Whichever you choose, invest in bass traps', 'The KRK Rokit 5 G5 adds DSP room correction with three voicings for under $400 a pair. Whichever you choose, invest in bass traps');
guide.conclusion_es = R(guide.conclusion_es, 'Sea cual sea tu elección, invierte en trampas', 'El KRK Rokit 5 G5 añade corrección DSP de sala con tres modos por menos de $400 el par. Sea cual sea tu elección, invierte en trampas');
guide.verdict = R(guide.verdict, 'and the Genelec 8030C is the professional reference with the tightest tolerance.', 'and the Genelec 8030C is the professional reference with the tightest tolerance. The KRK Rokit 5 G5 adds DSP tuning with three voicings under $400 a pair.');
guide.verdict_es = R(guide.verdict_es, 'y el Genelec 8030C es la referencia profesional con la tolerancia más ajustada.', 'y el Genelec 8030C es la referencia profesional con la tolerancia más ajustada. El KRK Rokit 5 G5 añade afinación DSP con tres modos por menos de $400 el par.');
guide.description = R(guide.description, 'Genelec, ADAM & Neumann.', 'Genelec, ADAM, KRK & Neumann.');
guide.description_es = R(guide.description_es, 'Genelec, ADAM y Neumann.', 'Genelec, ADAM, KRK y Neumann.');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
