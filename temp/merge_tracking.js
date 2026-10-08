const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

// ============ A. MERGE 605 -> 419 ============
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const p419 = P.find(p => p.id === 419);
assertEq(p419.title, 'Sennheiser HD 280 PRO II', '419 title');
p419.stores.andertons = 'https://www.andertons.co.uk/sennheiser-hd280-pro-headphones/';
p419.stores.zzounds = 'https://www.zzounds.com/a--925521/item--SENHD280PRO';
const i605 = P.findIndex(p => p.id === 605);
if (i605 < 0) throw new Error('605 already gone');
P.splice(i605, 1);

// ============ B. NDH 20 as new 605 ============
P.push({
  id: 605,
  title: 'Neumann NDH 20',
  title_es: 'Neumann NDH 20',
  brand: 'Neumann',
  category: 'headphones',
  price: 549,
  rating: 4.7,
  reviews: 1200,
  badge: 'premium',
  desc: 'Closed-back flagship with 38mm neodymium drivers, 150-ohm impedance and over 34 dB of isolation. Mix-grade neutrality from Neumann monitors in a foldable aluminum frame with two detachable cables.',
  desc_es: 'Insignia cerrado con drivers de neodimio de 38 mm, impedancia de 150 ohmios y más de 34 dB de aislamiento. Neutralidad de mezcla digna de monitores Neumann en chasis plegable de aluminio con dos cables desmontables.',
  img: 'https://r2.gear4music.com/media/45/450504/1200/preview.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/PA-DJ-and-Lighting/Neumann-NDH-20-Closed-Back-Headphones/2UNS'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Neumann-NDH-20/art-REC0014175-000',
    amazon: 'https://www.amazon.com/dp/B07M6RVR1Y',
    andertons: 'https://www.andertons.co.uk/neumann-ndh-20-closed-back-studio-headphones/',
    zzounds: 'https://www.zzounds.com/a--925521/item--NEUNDH20'
  }
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products.json: 605=NDH20, 419 merged');

// ============ C. TEST_SHOP_BTN ============
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
// 419: add zzounds+andertons, MS 74.80 -> 89.00
{
  const i = bg.indexOf('  419: {');
  if (i < 0) throw new Error('419 missing');
  const j = bg.indexOf('\n  },', i);
  let block = bg.slice(i, j);
  if (!block.includes('"€74.80"') && !block.includes('74.80')) throw new Error('419 MS anchor gone: ' + block.slice(0, 250));
  block = block.replace(/musicstore: "[^"]*"/, 'musicstore: "€89.00"');
  if (!block.includes('zzounds')) block = block.replace('    }\n', '      zzounds: "$99.95",\n      andertons: "£75.00",\n    }\n');
  else throw new Error('419 already has zzounds');
  bg = bg.slice(0, i) + block + bg.slice(j);
  console.log('419 TEST merged');
}
// 605 block currently HD280 -> replace whole block with NDH20
{
  const i = bg.indexOf('  605: {');
  if (i < 0) throw new Error('605 TEST missing');
  const j = bg.indexOf('\n  },', i);
  const nb = `  605: {
    prices: {
      amazon: "$549.00",
      zzounds: "$599.00",
      andertons: "£434.00",
      gear4music: "£434.04"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/Neumann-NDH-20/art-REC0014175-000"
    }
  },`;
  bg = bg.slice(0, i) + nb + bg.slice(j + 4);
  console.log('605 TEST = NDH20');
}
fs.writeFileSync(DIR + 'build-guides.js', bg);

// ============ D. guides.json ============
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
// budget-headphones: 605 -> 419
{
  const b = G.find(x => x.id === 'budget-headphones');
  assertEq(JSON.stringify(b.featuredProducts), JSON.stringify([426, 26, 198, 427, 420, 428, 604, 605]), 'budget feat');
  b.featuredProducts = [426, 26, 198, 427, 420, 428, 604, 419];
  const s = b.sections[b.sections.length - 1];
  assertEq(s.products.join(','), '605', 'budget last sec');
  assertEq(s.heading.includes('HD 280'), true, 'budget last heading');
  s.products = [419];
  console.log('budget-headphones 605->419');
}
// tracking-headphones: add 198 + 605
{
  const t = G.find(x => x.id === 'tracking-headphones');
  assertEq(JSON.stringify(t.featuredProducts), JSON.stringify([23, 419, 420, 421, 25, 26]), 'track feat');
  t.featuredProducts.push(198, 605);
  t.sections.push({
    heading: 'Flat Means Flat: Is the ATH-M40x the Honest Tracking Tool?',
    heading_es: 'Plano significa plano: ¿es el ATH-M40x la herramienta honesta para grabar?',
    content: '<p><strong>Forget fun — the M40x is for hearing what is actually on the track.</strong> Where its famous sibling boosts lows and highs, the ATH-M40x stays flat and honest, so recording mistakes show up in the cans before they fossilize in the mix. The 40mm drivers with rare-earth magnets and CCAW coils resolve edit clicks, mouth noise and room problems with clinical clarity.</p><p>For tracking duty it covers the essentials: 90-degree swiveling earcups for one-ear monitoring, strong passive isolation that keeps the mix out of the mic, and two detachable cables (coiled and straight) so a cable failure never kills a session. At 35 ohms it plays loud from any interface or laptop.</p><p>The price of honesty is boredom: this is not a headphone for enjoying music, the clamp grips firmly until broken in, and the mostly-plastic frame feels basic next to premium rivals. For engineers who track with their eyes on the meters and their trust in flat response, it is the sub-$120 conscience of the studio.</p>',
    content_es: '<p><strong>Olvida la diversión — los M40x están para oír lo que hay de verdad en la pista.</strong> Donde su famoso hermano realza graves y agudos, los ATH-M40x se mantienen planos y honestos, así los errores de grabación aparecen en los auriculares antes de fosilizarse en la mezcla. Los drivers de 40 mm con imanes de tierras raras y bobinas CCAW resuelven clics de edición, ruidos de boca y problemas de sala con claridad clínica.</p><p>Para grabar cubren lo esencial: copas giratorias 90 grados para monitoreo a una oreja, aislamiento pasivo fuerte que mantiene la mezcla fuera del micrófono y dos cables desmontables (espiral y recto) para que un cable roto nunca mate una sesión. Con 35 ohmios suenan alto desde cualquier interfaz o laptop.</p><p>El precio de la honestidad es el aburrimiento: no son para disfrutar música, la presión aprieta firme hasta adaptarse y el chasis mayormente plástico se siente básico junto a rivales premium. Para ingenieros que graban con la vista en los medidores y la confianza en la respuesta plana, son la conciencia del estudio por menos de $120.</p>',
    products: [198]
  });
  t.sections.push({
    heading: 'Neumann Isolation, Neumann Price: Is the NDH 20 the Endgame Closed-Back?',
    heading_es: 'Aislamiento Neumann, precio Neumann: ¿es el NDH 20 el cerrado definitivo?',
    content: '<p><strong>This is what happens when the monitor company builds a headphone.</strong> The NDH 20 takes the balanced, unhyped voicing of Neumann studio monitors and seals it into a closed-back with over 34 dB of isolation — track vocals next to a drum kit without contamination. The 38mm neodymium drivers deliver monitor-grade resolution and stereo imaging that cheaper closeds smear.</p><p>Build matches the badge: machined aluminum cups, spring-steel band, memory-foam pads for long sessions, foldable frame, and two detachable cables (straight and coiled) in a soft bag. Unlike most closed-backs, it is genuinely mix-capable, so one pair covers tracking and road mixing.</p><p>Reality checks: 150 ohms wants a proper headphone amp — a weak laptop jack leaves them quiet and dull. At 390 g it is the heaviest pair here, and flagship money buys a lot of microphones instead. For professionals who bill by isolation and translation accuracy, it is the endgame closed-back.</p>',
    content_es: '<p><strong>Esto pasa cuando la marca de monitores fabrica un auricular.</strong> El NDH 20 toma la afinación equilibrada y sin adornos de los monitores Neumann y la sella en un cerrado con más de 34 dB de aislamiento — graba voces junto a una batería sin contaminación. Los drivers de neodimio de 38 mm entregan resolución e imagen estéreo de grado monitor que los cerrados baratos difuminan.</p><p>La construcción está a la altura: copas de aluminio mecanizado, diadema de acero, almohadillas con espuma con memoria para sesiones largas, chasis plegable y dos cables desmontables (recto y espiral) en bolsa blanda. A diferencia de la mayoría de cerrados, sirve de verdad para mezclar, así un par cubre grabación y mezcla móvil.</p><p>Controles de realidad: los 150 ohmios piden un amplificador de auriculares decente — una salida floja de laptop los deja bajos y apagados. Con 390 g son el par más pesado de aquí, y ese dinero insignia compra muchos micrófonos. Para profesionales que facturan por aislamiento y precisión de traducción, es el cerrado definitivo.</p>',
    products: [605]
  });
  assertEq(t.productTable.columns.length, 7, 'track cols');
  t.productTable.columns.push({ title: 'Audio-Technica ATH-M40x', title_es: 'Audio-Technica ATH-M40x' });
  t.productTable.columns.push({ title: 'Neumann NDH 20', title_es: 'Neumann NDH 20' });
  function col(label, v8, v9) {
    const r = t.productTable.rows.find(x => x.label === label);
    if (!r) throw new Error('no row ' + label);
    assertEq(r.values.length, 7, 'row len ' + label);
    r.values.push({ value: v8[0], value_es: v8[1] }, { value: v9[0], value_es: v9[1] });
  }
  col('Best For', ['Flat analytical tracking', 'Grabación analítica y plana'], ['Premium isolation & reference', 'Aislamiento premium y referencia']);
  col('Estimated Price', ['$79–$109', '$79–$109'], ['$549–$599', '$549–$599']);
  col('Type', ['Closed-back', 'Cerrados'], ['Closed-back', 'Cerrados']);
  col('Driver Size', ['40mm', '40mm'], ['38mm', '38mm']);
  col('Impedance', ['35 Ω', '35 Ω'], ['150 Ω', '150 Ω']);
  col('Sensitivity', ['98 dB', '98 dB'], ['114 dB', '114 dB']);
  col('Frequency Response', ['15 Hz – 24 kHz', '15 Hz – 24 kHz'], ['5 Hz – 30 kHz', '5 Hz – 30 kHz']);
  col('Cable', ['Detachable (2 included)', 'Desmontable (2 incluidos)'], ['Detachable (straight + coiled)', 'Desmontable (recto + espiral)']);
  col('Weight', ['240 g', '240 g'], ['390 g', '390 g']);
  t.verdictProsCons.push({
    name: 'Audio-Technica ATH-M40x',
    name_es: 'Audio-Technica ATH-M40x',
    pros: [
      'Flatter, more honest tuning than the M50x for catching recording mistakes',
      '90-degree swiveling earcups for classic one-ear monitoring',
      'Strong passive isolation keeps the mix out of the mic',
      'Two detachable cables plus collapsible frame for working life'
    ],
    pros_es: [
      'Afinación más plana y honesta que la del M50x para cazar errores de grabación',
      'Copas giratorias 90 grados para el clásico monitoreo a una oreja',
      'Aislamiento pasivo fuerte que mantiene la mezcla fuera del micrófono',
      'Dos cables desmontables más chasis plegable para la vida laboral'
    ],
    cons: [
      'Flat tuning sounds boring for casual music enjoyment',
      'Firm clamp grips until the frame breaks in',
      'Mostly-plastic build feels basic next to premium rivals',
      'Ear pads wear faster under daily booth use'
    ],
    cons_es: [
      'La afinación plana suena aburrida para disfrutar música',
      'La presión firme aprieta hasta que el chasis se adapta',
      'La construcción mayormente plástica se siente básica junto a rivales premium',
      'Las almohadillas se gastan más rápido con uso diario en cabina'
    ]
  });
  t.verdictProsCons.push({
    name: 'Neumann NDH 20',
    name_es: 'Neumann NDH 20',
    pros: [
      'Over 34 dB of isolation — track next to a drum kit cleanly',
      'Monitor-grade neutrality and imaging from 38mm Neumann drivers',
      'Machined aluminum cups and spring-steel band built for decades',
      'Genuinely mix-capable — one pair for tracking and road mixing'
    ],
    pros_es: [
      'Más de 34 dB de aislamiento — graba junto a una batería sin suciedad',
      'Neutralidad e imagen de grado monitor con drivers Neumann de 38 mm',
      'Copas de aluminio mecanizado y diadema de acero para décadas',
      'Sirve de verdad para mezclar — un par para grabar y mezclar fuera'
    ],
    cons: [
      '150 ohms demands a proper headphone amp',
      '390 g is the heaviest pair in this guide',
      'Flagship money competes with microphone budgets',
      'Silver finish shows studio wear faster than black'
    ],
    cons_es: [
      'Los 150 ohmios exigen un amplificador de auriculares decente',
      'Los 390 g son el par más pesado de esta guía',
      'El dinero insignia compite con presupuestos de micrófonos',
      'El acabado plateado muestra más el desgaste de estudio que el negro'
    ]
  });
  // conclusion + verdict (seven -> nine + new sentences)
  const conFrom = 'And the MDR-7506 remains the smart buy for outfitting a studio with multiple pairs for band sessions. Together, these seven headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.';
  if (!t.conclusion.includes(conFrom)) throw new Error('con EN anchor');
  t.conclusion = t.conclusion.replace(conFrom, 'And the MDR-7506 remains the smart buy for outfitting a studio with multiple pairs for band sessions. The ATH-M40x is the flat, honest tracker for engineers who mistrust hype, and the Neumann NDH 20 is the premium endgame with monitor-grade neutrality and over 34 dB of isolation. Together, these nine headphones cover every tracking scenario from solo vocal overdubs to full-band live recordings.');
  const conEsFrom = 'Juntos, estos siete auriculares cubren cada escenario de grabación.';
  if (!t.conclusion_es.includes(conEsFrom)) throw new Error('con ES anchor');
  t.conclusion_es = t.conclusion_es.replace(conEsFrom, 'Los ATH-M40x son el monitor plano y honesto para ingenieros que desconfían del adorno, y el Neumann NDH 20 es la gama premium definitiva con neutralidad de grado monitor y más de 34 dB de aislamiento. Juntos, estos nueve auriculares cubren cada escenario de grabación.');
  const verFrom = 'The K371 nails the Harman target, and the MDR-7506 is the smart studio staple.';
  if (!t.verdict.includes(verFrom)) throw new Error('verdict anchor');
  t.verdict = t.verdict.replace(verFrom, 'The K371 nails the Harman target, the MDR-7506 is the smart studio staple, the ATH-M40x is the flat honest tracker, and the Neumann NDH 20 is the premium endgame.');
  const verEsFrom = 'Las K371 dan en el clavo con la curva Harman, y las MDR-7506 son el estándar inteligente de estudio.';
  if (!t.verdict_es.includes(verEsFrom)) throw new Error('verdict es anchor');
  t.verdict_es = t.verdict_es.replace(verEsFrom, 'Las K371 dan en el clavo con la curva Harman, las MDR-7506 son el estándar inteligente de estudio, los ATH-M40x son el monitor plano y honesto, y el Neumann NDH 20 es la gama premium definitiva.');
  console.log('tracking updated');
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
