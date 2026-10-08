const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'open-headphones');
function assertEq(actual, expected, what) {
  if (actual !== expected) throw new Error('ASSERT ' + what + ':\nGOT: ' + actual + '\nEXP: ' + expected);
}

// ---------- featuredProducts ----------
assertEq(JSON.stringify(o.featuredProducts), JSON.stringify([24, 422, 423, 424, 56, 178, 425, 426]), 'featured');
o.featuredProducts = [24, 422, 423, 424, 56, 178, 603, 602];

// ---------- sections 6 (Sundara->MKII) and 7 (HD560S->DT900PX) ----------
assertEq(o.sections[6].products.join(','), '425', 'sec6 products');
assertEq(o.sections[7].products.join(','), '426', 'sec7 products');
o.sections[6] = {
  heading: 'Tamed Treble, Two Signatures: Is the DT 1990 Pro MKII the New Tesla Reference?',
  heading_es: 'Agudos domados, dos firmas: ¿es el DT 1990 Pro MKII la nueva referencia Tesla?',
  content: '<strong>The MKII fixes the one complaint about the original: hot treble.</strong> Beyerdynamic kept the detail above 10 kHz and gently pulled back the 8 kHz peak that caused harsh calls on the MKI, so long sessions end without fatigue and EQ moves stay honest. At its core sit 45mm TESLA.45 drivers with over one tesla of flux density, delivering deep precise bass and microscopic transient detail. Despite the flagship tag, impedance is just 30 ohms, so an interface, laptop or even a phone drives them properly. Two velour pad sets change the tuning — Producing for a fuller low end, Mixing & Mastering for analytical flatness — and both cables plus a hard case come in the box. At 376 g with a spring-steel band they are built like the German tank they are. Made for mixers who want flagship resolution without a flagship amp stack.',
  content_es: '<strong>El MKII corrige la única queja del original: los agudos picantes.</strong> Beyerdynamic mantuvo el detalle por encima de 10 kHz y suavizó el pico de 8 kHz que provocaba decisiones duras en el MKI, así las sesiones largas terminan sin fatiga y los movimientos de EQ siguen siendo honestos. En su interior hay drivers TESLA.45 de 45 mm con más de un tesla de densidad de flujo, con graves profundos y precisos y detalle transitorio microscópico. A pesar de ser buque insignia, la impedancia es de solo 30 ohmios, así que una interfaz, una laptop o incluso un teléfono los mueve bien. Dos juegos de almohadillas cambian la afinación — producción para graves con más cuerpo, mezcla y mastering para planitud analítica — y ambos cables más un estuche rígido vienen en la caja. Con 376 g y diadema de acero son un tanque alemán. Hechos para quien mezcla y quiere resolución insignia sin una torre de amplificación.',
  products: [603]
};
o.sections[7] = {
  heading: 'Loud From a Laptop: Is the DT 900 Pro X the Home-Studio Sweet Spot?',
  heading_es: 'Alto desde una laptop: ¿es el DT 900 Pro X el punto ideal del home studio?',
  content: '<strong>This is the DT 990 Pro, modernized for how people actually work.</strong> The 48-ohm STELLAR.45 drivers deliver full studio level from a laptop, tablet or basic interface — no dedicated amp required — while keeping the wide open stage beyerdynamic is known for. Unlike the classic DT 990 Pro, the cable detaches via locking mini-XLR, and two cables (3 m and 1.8 m) come included. Velour pads and a memory-foam band keep 345 g comfortable for hours, and nearly every part is replaceable. Tuning is flatter and calmer than the old DT 990, so mixes translate without the treble guesswork. Made for home studios that want one honest open-back that works with everything they own.',
  content_es: '<strong>Este es el DT 990 Pro, modernizado para como se trabaja de verdad.</strong> Los drivers STELLAR.45 de 48 ohmios dan nivel completo de estudio desde una laptop, una tablet o una interfaz básica — sin amplificador dedicado — manteniendo el escenario abierto y amplio por el que beyerdynamic es conocida. A diferencia del clásico DT 990 Pro, el cable se desmonta con mini-XLR con bloqueo, y vienen incluidos dos cables (3 m y 1,8 m). Las almohadillas de velour y la diadema con espuma con memoria mantienen los 345 g cómodos durante horas, y casi cada pieza es reemplazable. La afinación es más plana y calmada que la del viejo DT 990, así las mezclas se traducen sin adivinar los agudos. Hechos para home studios que quieren un abierto honesto que funcione con todo lo que tienen.',
  products: [602]
};

// ---------- productTable columns 6,7 ----------
assertEq(o.productTable.columns[6].title, 'Hifiman Sundara', 'col6 title');
assertEq(o.productTable.columns[7].title, 'Sennheiser HD 560S', 'col7 title');
o.productTable.columns[6] = { title: 'Beyerdynamic DT 1990 Pro MKII', title_es: 'Beyerdynamic DT 1990 Pro MKII' };
o.productTable.columns[7] = { title: 'Beyerdynamic DT 900 Pro X', title_es: 'Beyerdynamic DT 900 Pro X' };
function col(label, i, en, es) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  r.values[i].value = en; r.values[i].value_es = es;
}
const MKII = {
  'Best For': ['Flagship mixing and mastering', 'Mezcla y mastering insignia'],
  'Estimated Price': ['$599–$649', '$599–$649'],
  'Driver Size': ['45mm (Tesla dynamic)', '45 mm (dinámico Tesla)'],
  'Impedance': ['30 Ω', '30 Ω'],
  'Sensitivity': ['94 dB', '94 dB'],
  'Frequency Response': ['5 Hz — 40 kHz', '5 Hz — 40 kHz'],
  'Cable': ['Detachable (straight + coiled)', 'Desmontable (recto + espiral)'],
  'Weight': ['376 g', '376 g']
};
const P900 = {
  'Best For': ['Amp-free studio mixing', 'Mezcla de estudio sin amplificador'],
  'Estimated Price': ['$279–$319', '$279–$319'],
  'Driver Size': ['45mm (Stellar dynamic)', '45 mm (dinámico Stellar)'],
  'Impedance': ['48 Ω', '48 Ω'],
  'Sensitivity': ['100 dB', '100 dB'],
  'Frequency Response': ['5 Hz — 40 kHz', '5 Hz — 40 kHz'],
  'Cable': ['Detachable (2 included)', 'Desmontable (2 incluidos)'],
  'Weight': ['345 g', '345 g']
};
Object.keys(MKII).forEach(k => col(k, 6, MKII[k][0], MKII[k][1]));
Object.keys(P900).forEach(k => col(k, 7, P900[k][0], P900[k][1]));
// Type row stays Open-back; assert untouched
assertEq(o.productTable.rows.find(x => x.label === 'Type').values[6].value, 'Open-back', 'type col6');

// ---------- verdictProsCons ----------
const vi = o.verdictProsCons.findIndex(v => v.name === 'Hifiman Sundara');
if (vi < 0) throw new Error('no Sundara verdict');
o.verdictProsCons[vi] = {
  name: 'Beyerdynamic DT 1990 Pro MKII',
  name_es: 'Beyerdynamic DT 1990 Pro MKII',
  pros: [
    '45mm TESLA.45 drivers with over one tesla of flux density and microscopic transient detail',
    '8 kHz peak tamed vs the MKI — no fatigue, no harsh EQ calls',
    'Two pad sets switch between producing fullness and mastering-grade analysis',
    '30-ohm impedance runs from interfaces, laptops and phones'
  ],
  pros_es: [
    'Drivers TESLA.45 de 45 mm con más de un tesla de densidad de flujo y detalle transitorio microscópico',
    'Pico de 8 kHz domado frente al MKI — sin fatiga ni decisiones duras de EQ',
    'Dos juegos de almohadillas alternan entre cuerpo para producir y análisis de mastering',
    'La impedancia de 30 ohmios funciona desde interfaces, laptops y teléfonos'
  ],
  cons: [
    'Flagship price — roughly double the DT 900 Pro X',
    '376 g is hefty for very long wearing sessions',
    'Open-back leaks both ways — useless for live tracking',
    'Premium hard case adds bulk to a mobile kit'
  ],
  cons_es: [
    'Precio insignia — más o menos el doble que el DT 900 Pro X',
    'Los 376 g pesan en sesiones de uso muy largas',
    'Lo abierto fuga en ambas direcciones — inútil para grabar tomas',
    'El estuche rígido premium abulta un equipo móvil'
  ]
};
const vj = o.verdictProsCons.findIndex(v => v.name === 'Sennheiser HD 560S');
if (vj < 0) throw new Error('no 560S verdict');
o.verdictProsCons[vj] = {
  name: 'Beyerdynamic DT 900 Pro X',
  name_es: 'Beyerdynamic DT 900 Pro X',
  pros: [
    '48-ohm STELLAR.45 drivers hit full level from any device — no amp needed',
    'Detachable locking mini-XLR cable (the classic DT 990 lacks this)',
    'Flatter, calmer tuning than the DT 990 Pro for reliable translation',
    'Nearly every part replaceable; handmade in Germany'
  ],
  pros_es: [
    'Los drivers STELLAR.45 de 48 ohmios dan nivel completo desde cualquier equipo — sin amplificador',
    'Cable desmontable mini-XLR con bloqueo (el clásico DT 990 no lo tiene)',
    'Afinación más plana y calmada que la del DT 990 Pro para una traducción fiable',
    'Casi cada pieza es reemplazable; fabricados a mano en Alemania'
  ],
  cons: [
    'Treble still lively — very bright mixes can feel forward',
    '345 g plus a firm clamp needs a break-in period',
    'Open-back design leaks sound into live mics',
    'No folding mechanism — the soft bag is basic next to a hard case'
  ],
  cons_es: [
    'Los agudos siguen vivos — mezclas muy brillantes pueden sentirse adelantadas',
    'Los 345 g más una presión firme piden un periodo de adaptación',
    'El diseño abierto fuga sonido hacia los micrófonos en vivo',
    'Sin mecanismo plegable — la bolsa blanda es básica junto a un estuche rígido'
  ]
};

// ---------- conclusion / verdict / description_es ----------
assertEq(o.verdict.includes('Sundara'), true, 'verdict has Sundara');
o.verdict = 'The HD 490 Pro Plus is the modern reference king. The HD 600 remains the timeless choice. The ATH-R70x and NDH 30 bring professional accuracy at different price points. The DT 990 Pro delivers a wide soundstage. The LCD-X keeps planar magnetic detail for purists, the DT 1990 Pro MKII is the flagship Tesla reference, and the DT 900 Pro X is the amp-free sweet spot.';
o.verdict_es = 'Los HD 490 Pro Plus son los reyes de la referencia moderna. El HD 600 sigue siendo una opción atemporal. Los ATH-R70x y el NDH 30 aportan precisión profesional. El DT 990 Pro ofrece un escenario amplio. El LCD-X mantiene el detalle planar magnético para puristas, el DT 1990 Pro MKII es la referencia insignia Tesla y el DT 900 Pro X es el punto ideal sin amplificador.';
const oldCon = 'The Audeze LCD-X brings planar magnetic detail with all-day comfort. The Hifiman Sundara proves that planar magnetic technology can compete at a fraction of the price. And the HD 560S is the smart entry point for anyone moving from closed-backs to open-back mixing.';
if (!o.conclusion.includes(oldCon)) throw new Error('conclusion block not found');
o.conclusion = o.conclusion.replace(oldCon, 'The Audeze LCD-X keeps planar magnetic detail for purists. The Beyerdynamic DT 1990 Pro MKII is the new Tesla flagship for mixing and mastering. And the Beyerdynamic DT 900 Pro X is the amp-free sweet spot for home studios.');
const oldConEs = 'El Audeze LCD-X aporta detalle de planar magnético con comodidad durante todo el día. El Hifiman Sundara demuestra que la tecnología de planar magnético puede competir en una fracción del precio. Y los HD 560S son el punto de entrada inteligente para cualquiera que pase de los cerrados a la mezcla abierta.';
if (!o.conclusion_es.includes(oldConEs)) throw new Error('conclusion_es block not found');
o.conclusion_es = o.conclusion_es.replace(oldConEs, 'El Audeze LCD-X mantiene el detalle planar magnético para puristas. El Beyerdynamic DT 1990 Pro MKII es el nuevo buque insignia Tesla para mezcla y mastering. Y el Beyerdynamic DT 900 Pro X es el punto ideal sin amplificador para home studios.');
if (!o.description_es.includes('vs Sundara')) throw new Error('description_es Sundara not found');
o.description_es = o.description_es.replace('vs Sundara', 'vs DT 900 Pro X');

// ---------- ATH-R70xa section cross-mention ----------
const r70 = o.sections.find(s => s.heading.includes('ATH-R70xa'));
if (!r70) throw new Error('no R70xa section');
if (!r70.content.includes('and Hifiman Sundara.')) throw new Error('R70xa EN mention not found');
r70.content = r70.content.replace('and Hifiman Sundara.', 'and Beyerdynamic DT 900 Pro X.');
if (!r70.content_es.includes('y el Hifiman Sundara.')) throw new Error('R70xa ES mention not found');
r70.content_es = r70.content_es.replace('y el Hifiman Sundara.', 'y el Beyerdynamic DT 900 Pro X.');

// ---------- ATH-R70xa verdict cross-mention ----------
const v3 = o.verdictProsCons[3];
assertEq(v3.name, 'Audio-Technica ATH-R70xa', 'v3 name');
assertEq(v3.cons[2], 'Price pitches it directly against the HD 490 Pro and Sundara', 'v3 con en');
v3.cons[2] = 'Price pitches it directly against the HD 490 Pro and DT 900 Pro X';
assertEq(v3.cons_es[2], 'Su precio lo sitúa directamente frente al HD 490 Pro y el Sundara', 'v3 con es');
v3.cons_es[2] = 'Su precio lo sitúa directamente frente al HD 490 Pro y el DT 900 Pro X';

// ---------- final sweep: no strays ----------
const left = JSON.stringify(o).match(/Sundara|Hifiman|HD 560S|560S/g);
if (left) throw new Error('strays left: ' + JSON.stringify(left.slice(0, 10)));
console.log('open-headphones migrated, no strays');

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
