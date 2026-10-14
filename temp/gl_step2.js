const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
if (g.featuredProducts.length !== 10) die('featured inesperado: ' + g.featuredProducts.length);

// ---------- 1. featured 10 -> 12 ----------
g.featuredProducts = [157, 163, 161, 159, 160, 164, 165, 441, 442, 162, 467, 683];
console.log('featured: 10 -> 12');

// ---------- 2. tabla 10 -> 12 ----------
const COLS = [
  "Squier Classic Vibe '60s Jazz Bass", 'Sire Marcus Miller V5 4-String Bass', 'Sterling by Music Man StingRay Ray4',
  'Yamaha TRBX304', 'Ibanez SR300E', 'Schecter Stiletto Stealth 4 Bass', 'ESP LTD B-204SM Bass Guitar',
  'Fender Player II Precision Bass', 'Fender Player II Jazz Bass', "Epiphone Thunderbird '64 Bass",
  'Yamaha BB434', 'G&L Tribute L-2000'
];
const NP = 'Not published (varies by unit)';
const NPE = 'No publicado (varía por unidad)';
const DATA = {
  'Yamaha BB434': {
    'Best For': ['Passive P/J with real sustain', 'P/J pasivo con sustain de verdad'],
    'Estimated Price': ['~$599', '~$599'],
    'Body Wood': ['Alder', 'Aliso'],
    'Neck': ['5-pc maple/mahogany, 21 frets', '5 piezas arce/caoba, 21 trastes'],
    'Frets & Fretboard': ['21, rosewood, 10" radius', '21, palisandro, radio 10"'],
    'Pickups': ['YGD V5 split P + V5 single J', 'YGD V5 split P + V5 single J'],
    'Active/Passive': ['Passive', 'Pasivo'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['Neck vol, bridge vol, master tone', 'Vol mástil, vol puente, tono maestro'],
    'Tuners': ['Lightweight open-gear', 'Open-gear ligeras'],
    'Weight': [NP, NPE]
  },
  'G&L Tribute L-2000': {
    'Best For': ['Passive, active or boosted from one bass', 'Pasivo, activo o boosted en un solo bajo'],
    'Estimated Price': ['Not published', 'No publicado'],
    'Body Wood': ['Ash top over poplar', 'Tapa de fresno sobre álamo'],
    'Neck': ['Hard-rock maple medium C, 21 frets', 'Hard rock maple en C media, 21 trastes'],
    'Frets & Fretboard': ['21 medium jumbo, rosewood, 12" radius', '21 medium jumbo, palisandro, radio 12"'],
    'Pickups': ['2x G&L MFD humbuckers, Fullerton CA', '2x humbuckers G&L MFD, Fullerton CA'],
    'Active/Passive': ['Passive / active switchable', 'Pasivo / activo conmutable'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['Tri-Tone: vol, treble, bass + 3 switches', 'Tri-Tone: vol, agudos, graves + 3 switches'],
    'Tuners': ['Traditional open-back', 'Abiertas tradicionales'],
    'Weight': [NP, NPE]
  }
};
const ti = g.productTable.columns.map(c => c.title);
['Yamaha BB434', 'G&L Tribute L-2000'].forEach(t => { if (ti.indexOf(t) > -1) die('ya en tabla: ' + t); });
COLS.forEach(t => g.productTable.columns.push({ title: t, title_es: t }));
let filled = 0;
g.productTable.rows.forEach(r => {
  r.values.forEach(v => { if (!v || !v.value || !v.value_es) die('celda corrupta en ' + r.label); });
  Object.keys(DATA).forEach(t => {
    const pair = DATA[t][r.label];
    if (!pair) die('falta ' + t + ' / ' + r.label);
    r.values.push({ value: pair[0], value_es: pair[1] });
    filled++;
  });
});
console.log('tabla: 10 -> ' + g.productTable.columns.length + ' columnas, ' + filled + ' celdas nuevas');

// ---------- 3. reviews nuevas ----------
g.sections.push({
  heading: 'Yamaha BB434: The 45-Degree Bridge, Explained',
  heading_es: 'Yamaha BB434: el puente a 45 grados, explicado',
  products: [467],
  content: '<p><strong>The BB434 is where the BB name earns its reputation, and the reason is in the bridge.</strong> Solid alder, a 5-piece maple/mahogany neck, a 6-bolt miter joint that pulls the neck tight against the body, and YGD Custom V5 Alnico V pickups — a split single-coil in the neck and a single-coil in the bridge — for the most convincing passive P/J here.</p><p><strong>Editor\'s note: string it through the body at 45 degrees.</strong> The Vintage Plus Light bridge is convertible: anchor the strings at the tail end for normal stringing, or run them through the body to a diagonal cut on the back, where they pass through the instrument at 45° instead of straight down. That diagonal path puts far less stress on the string at the break angle, so they keep their tension and do not die early, and it feeds string vibration into the body more efficiently. You hear it immediately as longer sustain and more resonance. Yamaha\'s own guidance: long-scale strings when you string through the bridge, super long-scale when you string through the body.</p><p><strong>Editor\'s note: the plan B is the BB234.</strong> If the BB434 (~$599) stretches the budget, the Yamaha BB234 is the honest fallback at roughly half the price. It sounds close — same ceramic P/J character, same 34-inch scale — but it drops the body-thru system and the reinforced 5-piece neck, so you give up some sustain and some stability. A safe first BB rather than the definitive one.</p>',
  content_es: '<p><strong>El BB434 es donde el nombre BB se gana su reputación, y la razón está en el puente.</strong> Aliso sólido, mástil de 5 piezas arce/caoba, unión de 6 tornillos que prensa el mástil contra el cuerpo, y pastillas YGD Custom V5 Alnico V — una split single-coil en el mástil y una single-coil en el puente — para el P/J pasivo más convincente de esta lista.</p><p><strong>Nota del editor: átalas a través del cuerpo a 45 grados.</strong> El puente Vintage Plus Light es convertible: ancla las cuerdas en la parte trasera para el cordaje normal, o hazlas pasar por el cuerpo hasta un corte diagonal en la parte de atrás, donde atraviesan el instrumento a 45° en lugar de recto. Ese recorrido diagonal soporta mucha menos tensión de la cuerda en el ángulo de salida, así que mantienen el afinado y no se mueren antes de tiempo, y además transfieren la vibración al cuerpo de forma más eficiente. Se nota de inmediato como un sustain más largo y más resonancia. Guía de Yamaha: cuerdas de escala larga si atas por el puente, super larga si atas por el cuerpo.</p><p><strong>Nota del editor: el plan B es el BB234.</strong> Si el BB434 (~$599) se te va de presupuesto, el Yamaha BB234 es el plan B honesto por la mitad de precio. Suena parecido — mismo carácter cerámico P/J, misma escala de 34 pulgadas — pero se queda sin el sistema de cuerdas a través del cuerpo y sin el mástil reforzado de 5 piezas, así que pierdes algo de sustain y de estabilidad. Un BB seguro para empezar, no el definitivo.</p>'
});
g.sections.push({
  heading: 'G&L Tribute L-2000: Fullerton Pickups, Tri-Tone Switches',
  heading_es: 'G&L Tribute L-2000: pastillas de Fullerton y switches Tri-Tone',
  products: [683],
  content: '<p><strong>Leo Fender designed this bass in 1980, and nothing else comes close to the range.</strong> Two G&L Magnetic Field Design humbuckers — the same L-spec pickups G&L builds in its Fullerton, California facility — feed the Tri-Tone preamp: three mini toggles for pickup selection, series/parallel routing and passive/active operation, plus volume, treble and bass knobs. The Saddle-Lock bridge pushes string energy straight into the end grain for a resonant, fast-sustain platform.</p><p><strong>Editor\'s note: the Tribute line is built outside the US, but the pickups are not the compromise people assume.</strong> G&L specifies the L-spec MFD humbuckers as made in Fullerton, California — the same voicing as the instruments built next door. You are paying a mid-range price for the tone-critical part of a flagship instrument.</p><p><strong>Editor\'s note: do not expect plug-and-play.</strong> Those three toggles are a Swiss-army knife — passive for vintage roundness, active for modern bite, active with treble boost for slap and metal — and they need a few days of experimenting before they stop being intimidating. It is not a traditional Fender you plug in and forget. Players coming from a simple P or J bass should budget that weekend.</p>',
  content_es: '<p><strong>Leo Fender diseñó este bajo en 1980 y nada más se acerca a ese rango.</strong> Dos humbuckers G&L Magnetic Field Design — las mismas pastillas L-spec que G&L fabrica en su planta de Fullerton, California — alimentan el previo Tri-Tone: tres miniswitches para selección de pastilla, ruteo serie/paralelo y operación pasiva/activa, más volumen, agudos y graves. El puente Saddle-Lock empuja la energía de las cuerdas directo a la madera de testa para una base resonante y con mucho sustain.</p><p><strong>Nota del editor: la línea Tribute se monta fuera de EE. UU., pero las pastillas no son el compromiso que se supone.</strong> G&L especifica las humbuckers MFD L-spec como fabricadas en Fullerton, California — la misma voz que los instrumentos que se montan al lado. Pagas precio de gama media por la parte que decide el tono de un instrumento insignia.</p><p><strong>Nota del editor: no esperes enchufar y tocar.</strong> Esos tres switches son una navaja suiza — pasivo para redondez vintage, activo para mordida moderna, activo con boost de agudos para slap y metal — y necesitan unos días deexperimentar antes de dejar de intimidar. No es un Fender tradicional que conectas y olvidas. Si vienes de un P o un J sencillo, reserva ese fin de semana.</p>'
});
g.sections[g.sections.length - 1].content_es = g.sections[g.sections.length - 1].content_es.replace('unos días de experimentos antes', 'unos días de experimentar antes');
console.log('reviews nuevas: BB434 (nota puente 45 grados + plan B BB234) y G&L Tribute L-2000');

// ---------- 4. veredictos 4+4 ----------
const add = (name, pros, cons, pros_es, cons_es) => g.verdictProsCons.push({ name, name_es: name, pros, cons, pros_es, cons_es });
add('Yamaha BB434',
  ['Convertible Vintage Plus Light bridge with 45-degree body-thru stringing', '6-bolt miter joint transfers vibration into the body for real sustain', '5-piece maple/mahogany neck resists warping', 'YGD V5 Alnico V P/J is the most convincing passive P/J here'],
  ['45-degree stringing needs super long-scale strings and careful setup', 'Lightweight open-gear tuners need regular restringing', 'Weighs in as the most expensive passive option on this list', 'The BB234 covers the same ground for roughly half the money'],
  ['Puente Vintage Plus Light convertible con cordaje a 45 grados a través del cuerpo', 'La unión de 6 tornillos transfiere la vibración al cuerpo: sustain de verdad', 'Mástil de 5 piezas arce/caoba que resiste la deformación', 'La YGD V5 Alnico V P/J es el P/J pasivo más convincente de esta lista'],
  ['El cordaje a 45 grados necesita cuerdas super largas y un ajuste cuidadoso', 'Clavijas open-gear ligeras: hay que re-afinar a menudo', 'Es la opción pasiva más cara de esta lista', 'El BB234 cubre lo mismo por la mitad de precio']);

add('G&L Tribute L-2000',
  ['L-spec G&L MFD humbuckers built in Fullerton, California', 'Tri-Tone preamp: passive, active or active with treble boost', 'Saddle-Lock bridge drives string energy into the end grain', 'One bass covers Precision, Jazz and StingRay territory'],
  ['Three mini toggles take days to master — not plug-and-play', 'Availability is patchy; several retailers list it as discontinued', 'Traditional open-back tuners are the weakest link', 'Ash-top build means no binding and no gloss-level finish'],
  ['Humbuckers MFD L-spec de G&L construidas en Fullerton, California', 'Previo Tri-Tone: pasivo, activo o activo con boost de agudos', 'El puente Saddle-Lock manda la energía de las cuerdas a la testa', 'Un solo bajo cubre terreno de Precision, Jazz y StingRay'],
  ['Los tres miniswitches tardan días en dominarse: no es enchufar y tocar', 'Disponibilidad irregular: varias tiendas lo marcan como descontinuado', 'Las clavijas abiertas tradicionales son el eslabón débil', 'La tapa de fresno va sin filetes ni acabado de nivel insignia']);

// reordenar
const order = g.productTable.columns.map(c => c.title);
g.verdictProsCons.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
const vo = g.verdictProsCons.map(v => v.name);
console.log('veredictos: ' + vo.length + ' | orden coincide: ' + (JSON.stringify(vo) === JSON.stringify(order)));

// ---------- 5. overview con los 12 ----------
const ov = g.sections.find(s => s.heading === 'Ten Basses, One Idea: Spend on the Right Parts');
ov.heading = 'Twelve Basses, One Idea: Spend on the Right Parts';
ov.heading_es = 'Doce bajos, una idea: gasta en las piezas correctas';
ov.products = g.featuredProducts.slice();
ov.content = ov.content.replace('That is why the list below is sorted by build', 'That is why the list below is sorted by build');
ov.content_es = ov.content_es.replace('Por eso la lista de abajo está ordenada por construcción', 'Por eso la lista de abajo está ordenada por construcción');
console.log('overview actualizado a ' + ov.products.length + ' productos y renombrado Twelve/Docce');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nSTEP_GUIDE OK');