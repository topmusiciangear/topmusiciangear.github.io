const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'best-headphones');
assertEq(o.productTable.columns.length, 7, 'cols');
assertEq(o.verdictProsCons.length, 7, 'verdicts');

function section(heading, heading_es, content, content_es, products) {
  o.sections.push({ heading, heading_es, content, content_es, products });
}
section(
  'First Pair Under $60: Is the ATH-M20x Enough to Start?',
  'Primer par por menos de $60: ¿basta el ATH-M20x para empezar?',
  '<p><strong>Every studio journey starts with a first pair, and this is the cheapest honest one.</strong> The ATH-M20x brings the M-Series fundamentals — closed-back isolation, 40mm drivers and a focused midrange — for the price of two pizzas. Podcasters and beginners get clean vocal monitoring without bleed, and the 47-ohm impedance plays loud from any laptop or phone.</p><p>The trade-offs are the price of admission: a fixed 3 m cable that cannot be replaced, basic plastic construction, and a low-end lift that flatters more than it reveals. It will not mix a record, but it will record a podcast and survive the backpack. For absolute beginners, it is the ticket in.</p>',
  '<p><strong>Todo camino de estudio empieza con un primer par, y este es el más barato honesto.</strong> Los ATH-M20x traen los fundamentos de la serie M — aislamiento cerrado, drivers de 40 mm y medios enfocados — por el precio de dos pizzas. Podcasters y principiantes obtienen monitoreo vocal limpio sin fuga, y la impedancia de 47 ohmios suena alto desde cualquier laptop o teléfono.</p><p>Las contrapartidas son el precio de entrada: cable fijo de 3 m que no se puede reemplazar, construcción plástica básica y un realce de graves que adula más que revela. No mezclará un disco, pero grabará un podcast y sobrevivirá a la mochila. Para principiantes absolutos, es el boleto de entrada.</p>',
  [609]
);
section(
  'Semi-Open for Peanuts: Is the Samson SR850 the Best Value Ever?',
  'Semiabierto por cacahuetes: ¿es el Samson SR850 la mejor relación calidad-precio?',
  '<p><strong>Under $50 for a semi-open studio design with 50mm drivers sounds like a typo — it is not.</strong> The SR850 delivers a wide, breathable stage that embarrasses sealed rivals at triple the price, with airy highs and honest-enough mids for first mixes. The self-adjusting headband and velour pads stay comfortable for hours.</p><p>Reality at this price: mostly-plastic build, a fixed cable, and treble brightness that not everyone loves. It will not survive a tour bus. But as the cheapest way to hear what a soundstage is supposed to feel like, nothing touches it. For curious beginners, it is the no-brainer second pair.</p>',
  '<p><strong>Menos de $50 por un diseño semiabierto de estudio con drivers de 50 mm suena a errata — no lo es.</strong> Los SR850 entregan un escenario amplio y respirable que avergüenza a rivales sellados del triple de precio, con agudos aéreos y medios bastante honestos para primeras mezclas. La diadema autoajustable y las almohadillas de velour se mantienen cómodas por horas.</p><p>La realidad a este precio: construcción mayormente plástica, cable fijo y brillo de agudos que no todos aprecian. No sobrevivirá a un autobús de gira. Pero como la forma más barata de oír cómo debe sentirse un escenario sonoro, nada lo toca. Para principiantes curiosos, es el segundo par obvio.</p>',
  [428]
);
section(
  'Featherlight and Flat: Is the ATH-R70xa the Comfortable Reference?',
  'Pluma y plano: ¿es el ATH-R70xa la referencia cómoda?',
  '<p><strong>At 199 g, this is the open-back you forget you are wearing.</strong> The ATH-R70xa pairs Audio-Technica flagship 45mm drivers with a featherlight carbon-composite frame, delivering extended 5 Hz – 40 kHz honesty that never fatigues. The dual-sided detachable cable keeps the signal path clean per channel.</p><p>The catch is drive: high impedance demands a proper amp to show its best, and the light clamp suits smaller heads more than large ones. It will not isolate or travel. For mixers who wear headphones all day and want flagship openness without flagship weight, it is the comfort reference.</p>',
  '<p><strong>Con 199 g, este es el abierto que olvidas que llevas puesto.</strong> Los ATH-R70xa combinan drivers insignia de 45 mm con chasis ultraligero de composite de carbono, con honestidad extendida de 5 Hz a 40 kHz que nunca fatiga. El cable desmontable bilateral mantiene limpia la señal por canal.</p><p>La pega es la amplificación: la impedancia alta exige un amplificador decente para mostrar lo mejor, y la presión ligera va mejor a cabezas pequeñas que grandes. No aísla ni viaja. Para quien mezcla con auriculares todo el día y quiere apertura insignia sin peso insignia, es la referencia cómoda.</p>',
  [423]
);
section(
  'Neumann Monitors for Your Head: Is the NDH 30 the Portable Mastering Room?',
  'Monitores Neumann para tu cabeza: ¿es el NDH 30 la sala de mastering portátil?',
  '<p><strong>Neumann put its monitor voicing into an open-back and called it a day.</strong> The NDH 30 resolves detail, imaging and depth the way KH-line speakers do, making it the portable mastering reference for engineers who already trust the brand. High-precision stereo placement survives translation to speakers.</p><p>Premium money buys premium demands: it wants a good amp and a quiet room, at 354 g it is no featherweight, and the silver finish shows studio wear. It will not track or commute. For mastering engineers who want their monitor wall in a headphone, it is the endgame open-back.</p>',
  '<p><strong>Neumann puso la afinación de sus monitores en un abierto y listo.</strong> El NDH 30 resuelve detalle, imagen y profundidad como los monitores de la línea KH, siendo la referencia portátil de mastering para ingenieros que ya confían en la marca. La colocación estéreo de alta precisión sobrevive a la traducción a altavoces.</p><p>El dinero premium exige demandas premium: quiere un buen amplificador y una sala silenciosa, con 354 g no es una pluma y el acabado plateado muestra el desgaste. No sirve para grabar ni para viajar. Para ingenieros de mastering que quieren su muro de monitores en un auricular, es el abierto definitivo.</p>',
  [424]
);
section(
  'Planar Money, Planar Detail: Is the LCD-X the Last Headphone You Buy?',
  'Dinero planar, detalle planar: ¿es el LCD-X el último auricular que compres?',
  '<p><strong>Planar magnetic drivers move as one sheet — and you hear everything.</strong> The LCD-X delivers transient precision and low-end extension no dynamic driver at any price truly matches, with a vast 106 x 110 mm diaphragm that renders mixes in microscope detail. Masters checked here translate with authority.</p><p>The invoice is physical too: 612 g of neck workout, a price that buys monitor pairs, and an amp-hungry appetite that laughs at laptop jacks. It will not leave the studio. For professionals who bill flagship clients and want the final word in a headphone, it is the last stop.</p>',
  '<p><strong>Los drivers planar magnéticos se mueven como una sola lámina — y se oye todo.</strong> El LCD-X entrega precisión transitoria y extensión de graves que ningún dinámico a ningún precio iguala de verdad, con un vasto diafragma de 106 x 110 mm que dibuja las mezclas con detalle de microscopio. Los masters revisados aquí se traducen con autoridad.</p><p>La factura también es física: 612 g de gimnasia cervical, un precio que compra pares de monitores y un apetito de amplificador que se ríe de las laptops. No saldrá del estudio. Para profesionales que facturan a clientes insignia y quieren la última palabra en un auricular, es la parada final.</p>',
  [178]
);

const cols = [
  ['Audio-Technica ATH-M20x', 'Audio-Technica ATH-M20x'],
  ['Samson SR850', 'Samson SR850'],
  ['Audio-Technica ATH-R70xa', 'Audio-Technica ATH-R70xa'],
  ['Neumann NDH 30', 'Neumann NDH 30'],
  ['Audeze LCD-X', 'Audeze LCD-X']
];
cols.forEach(([en, es]) => o.productTable.columns.push({ title: en, title_es: es }));
assertEq(o.productTable.columns.length, 12, 'cols12');
function col(label, vals) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 7, 'row len ' + label);
  vals.forEach(([en, es]) => r.values.push({ value: en, value_es: es }));
}
// order: M20x, SR850, R70xa, NDH30, LCD-X
col('Best For', [['Ultra-budget first pair', 'Primer par ultraeconómico'], ['Budget semi-open accuracy', 'Precisión semiabierta económica'], ['Featherlight open accuracy', 'Precisión abierta pluma'], ['Mastering-grade open reference', 'Referencia abierta de mastering'], ['Planar flagship detail', 'Detalle insignia planar']]);
col('Estimated Price', [['~$59', '~$59'], ['$37–$50', '$37–$50'], ['$349–$379', '$349–$379'], ['$545–$599', '$545–$599'], [['$1,199–$1,244', '$1,199–$1,244'][0], '$1,199–$1,244']]);
col('Type', [['Closed-back', 'Cerrados'], ['Semi-open', 'Semiabiertos'], ['Open-back', 'Abiertos'], ['Open-back', 'Abiertos'], ['Open-back planar', 'Abiertos planares']]);
col('Driver Size', [['40mm', '40mm'], ['50mm', '50mm'], ['45mm', '45mm'], ['38mm', '38mm'], ['106x110mm planar', '106x110mm planar']]);
col('Impedance', [['47 Ω', '47 Ω'], ['32 Ω', '32 Ω'], ['470 Ω', '470 Ω'], ['120 Ω', '120 Ω'], ['20 Ω', '20 Ω']]);
col('Sensitivity', [['96 dB', '96 dB'], ['98 dB', '98 dB'], ['97 dB', '97 dB'], ['118 dB', '118 dB'], ['103 dB', '103 dB']]);
col('Frequency Response', [['15 Hz – 20 kHz', '15 Hz – 20 kHz'], ['10 Hz – 30 kHz', '10 Hz – 30 kHz'], ['5 Hz – 40 kHz', '5 Hz – 40 kHz'], ['5 Hz – 30 kHz', '5 Hz – 30 kHz'], ['5 Hz – 20 kHz', '5 Hz – 20 kHz']]);
col('Cable', [['Fixed 3 m', 'Fijo 3 m'], ['Fixed 2.5 m', 'Fijo 2,5 m'], ['Detachable (dual-sided)', 'Desmontable (bilateral)'], ['Detachable (coiled & straight)', 'Desmontable (espiral y recto)'], ['Detachable (dual mini-XLR)', 'Desmontable (mini-XLR doble)']]);
col('Weight', [['190 g', '190 g'], ['276 g', '276 g'], ['199 g', '199 g'], ['354 g', '354 g'], ['612 g', '612 g']]);
const ep = o.productTable.rows.find(x => x.label === 'Ear Pads');
if (ep) {
  assertEq(ep.values.length, 7, 'pads');
  [['Pleather, fixed', 'Polipiel, fijas'], ['Velour, fixed', 'Velour, fijas'], ['Velour, replaceable', 'Velour, reemplazables'], ['Velour, replaceable', 'Velour, reemplazables'], ['Leather, replaceable', 'Cuero, reemplazables']].forEach(([en, es]) => ep.values.push({ value: en, value_es: es }));
}

function verdict(name, name_es, pros, pros_es, cons, cons_es) {
  o.verdictProsCons.push({ name, name_es, pros, pros_es, cons, cons_es });
}
verdict('Audio-Technica ATH-M20x', 'Audio-Technica ATH-M20x',
  ['The cheapest honest first pair for podcasting beginners', 'Closed-back isolation keeps voice takes clean', '47 ohms plays loud from any laptop or phone', '190 g featherweight for long sessions'],
  ['El primer par honesto más barato para principiantes de podcast', 'El aislamiento cerrado mantiene limpias las tomas de voz', 'Los 47 ohmios suenan alto desde cualquier laptop o teléfono', 'Pluma de 190 g para sesiones largas'],
  ['Fixed cable — a break means a new pair', 'Bass lift flatters more than it reveals', 'Basic plastic build for the price', 'Not a mixing tool, strictly an entry ticket']);
verdict('Audio-Technica ATH-M20x', 'x', [], [], [], []); // placeholder guard, replaced below
o.verdictProsCons.pop();
o.verdictProsCons[o.verdictProsCons.length - 1].cons_es = ['Cable fijo — una rotura significa un par nuevo', 'El realce de graves adula más que revela', 'Construcción plástica básica por el precio', 'No es herramienta de mezcla, estrictamente boleto de entrada'];
verdict('Samson SR850', 'Samson SR850',
  ['Semi-open stage under $50 — unbeatable value', 'Wide breathable sound for first mixes', 'Self-adjusting headband and velour pads', '32 ohms runs from anything including phones'],
  ['Escenario semiabierto por menos de $50 — valor imbatible', 'Sonido amplio y respirable para primeras mezclas', 'Diadema autoajustable y almohadillas de velour', 'Los 32 ohmios funcionan desde todo, incluidos teléfonos'],
  ['Mostly-plastic build, fixed cable', 'Treble brightness not everyone loves', 'No isolation for tracking with live mics', 'Quality control varies unit to unit'],
  ['Construcción mayormente plástica, cable fijo', 'Brillo de agudos que no todos aprecian', 'Sin aislamiento para grabar con micrófonos en vivo', 'El control de calidad varía entre unidades']);
verdict('Audio-Technica ATH-R70xa', 'Audio-Technica ATH-R70xa',
  ['199 g featherweight flagship you forget wearing', 'Extended honest response that never fatigues', 'Dual-sided detachable cable, clean per channel', 'Carbon frame built for all-day sessions'],
  ['Insignia pluma de 199 g que olvidas llevar puesto', 'Respuesta extendida honesta que nunca fatiga', 'Cable desmontable bilateral, limpio por canal', 'Chasis de carbono para sesiones de todo el día'],
  ['High impedance demands a proper amp', 'Light clamp suits smaller heads best', 'No isolation, no travel use', 'Premium price for comfort-first buyers']);
verdict('Audio-Technica ATH-R70xa', 'x', [], [], [], []); // placeholder guard, replaced below
o.verdictProsCons.pop();
o.verdictProsCons[o.verdictProsCons.length - 1].cons_es = ['La impedancia alta exige un amplificador decente', 'La presión ligera va mejor a cabezas pequeñas', 'Sin aislamiento ni uso viajero', 'Precio premium para compradores de comodidad'];
verdict('Neumann NDH 30', 'Neumann NDH 30',
  ['Monitor-voiced detail for portable mastering', 'High-precision imaging that survives translation', 'Open honesty without listener fatigue', 'Neumann badge engineers already trust'],
  ['Detalle con voz de monitor para mastering portátil', 'Imagen de alta precisión que sobrevive a la traducción', 'Honestidad abierta sin fatiga', 'Insignia Neumann en la que los ingenieros ya confían'],
  ['Wants a good amp and a quiet room', '354 g is no featherweight', 'Silver finish shows studio wear', 'Premium money, premium demands'],
  ['Quiere un buen amplificador y una sala silenciosa', 'Los 354 g no son una pluma', 'El acabado plateado muestra el desgaste', 'Dinero premium, demandas premium']);
verdict('Audeze LCD-X', 'Audeze LCD-X',
  ['Planar transient truth no dynamic truly matches', 'Low-end extension with microscope detail', 'Masters checked here translate with authority', 'Flagship clients recognize the tool'],
  ['Verdad transitoria planar que ningún dinámico iguala', 'Extensión de graves con detalle de microscopio', 'Los masters revisados aquí se traducen con autoridad', 'Los clientes insignia reconocen la herramienta'],
  ['612 g of neck workout', 'Price buys monitor pairs instead', 'Amp-hungry, laughs at laptop jacks', 'Never leaves the studio']);
verdict('Audeze LCD-X', 'x', [], [], [], []); // placeholder guard, replaced below
o.verdictProsCons.pop();
o.verdictProsCons[o.verdictProsCons.length - 1].cons_es = ['612 g de gimnasia cervical', 'El precio compra pares de monitores', 'Hambriento de amplificador, se ríe de las laptops', 'Nunca sale del estudio'];

function rep(field, from, to) {
  if (!o[field].includes(from)) throw new Error('no ' + field + ': ' + from.slice(0, 60));
  o[field] = o[field].split(from).join(to);
}
rep('conclusion', 'For mixing-focused work, the HD 490 Pro Plus is the most versatile keeper.', 'For mixing-focused work, the HD 490 Pro Plus is the most versatile keeper. Under $60, the ATH-M20x is the honest first ticket and the SR850 the absurd value; the ATH-R70xa is the featherlight comfort reference, the NDH 30 the portable mastering room, and the LCD-X the planar last word.');
rep('conclusion_es', 'Si solo pudiera quedarme con uno, sería el HD 490 Pro Plus — pero es porque mezclo más de lo que grabo.', 'Si solo pudiera quedarme con uno, sería el HD 490 Pro Plus — pero es porque mezclo más de lo que grabo. Por menos de $60, los ATH-M20x son el boleto honesto y los SR850 el valor absurdo; los ATH-R70xa son la referencia cómoda pluma, el NDH 30 la sala de mastering portátil y el LCD-X la última palabra planar.');
rep('verdict', 'The HD 600 fills the middle: legendary flat response for serious mixing without flagship cost.', 'The HD 600 fills the middle: legendary flat response for serious mixing without flagship cost. The M20x and SR850 open the door under $60, the R70xa floats at 199 g, the NDH 30 masters on the road, and the LCD-X ends the discussion.');
rep('verdict_es', 'Los HD 600 llenan el medio: respuesta plana legendaria para mezcla seria sin coste insignia.', 'Los HD 600 llenan el medio: respuesta plana legendaria para mezcla seria sin coste insignia. Los M20x y SR850 abren la puerta por menos de $60, los R70xa flotan con 199 g, el NDH 30 masteriza en la carretera y el LCD-X termina la discusión.');
console.log('best-headphones: 5 added, 12 total');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
