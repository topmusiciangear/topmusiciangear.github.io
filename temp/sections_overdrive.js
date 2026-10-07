const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-overdrive-distortion');
if (!g) throw new Error('guide not found');

// Unique headings for existing template sections (new anti-template rule)
const RH = (oldEn, newEn, oldEs, newEs) => {
  const sec = g.sections.find(s => s.heading === oldEn);
  if (!sec) throw new Error('heading not found: ' + oldEn);
  sec.heading = newEn;
  const secEs = g.sections.find(s => s.heading_es === oldEs);
  if (!secEs) throw new Error('heading_es not found: ' + oldEs);
  secEs.heading_es = newEs;
};
RH('Is the Ibanez TS9 Tube Screamer the Best Pedal for Your Pedalboard?', 'The Mid-Hump Classic: TS9 Tube Screamer',
  '¿Es el Ibanez tS9 tube screamer el mejor pedal para tu pedalera?', 'El clásico mid-hump: TS9 Tube Screamer');
RH('Is the Boss BD-2 Blues Driver the Best Pedal for Your Pedalboard?', 'Transparent Breakup: BD-2 Blues Driver',
  '¿Es el Boss BD-2 blues driver el mejor pedal para tu pedalera?', 'Breakup transparente: BD-2 Blues Driver');
RH('Is the ProCo RAT 2 the Best Pedal for Your Pedalboard?', 'Filter Knob Fury: ProCo RAT 2',
  '¿Es el proCo rAT 2 el mejor pedal para tu pedalera?', 'Furia del Filter: ProCo RAT 2');
console.log('existing headings rewritten');

// New sections
const SEC = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });
g.sections.push(SEC(
  'MOSFET Clipping, Amp-Like Feel: The OCD Story',
  'Clipping MOSFET con tacto de ampli: la historia del OCD',
  '<strong>If you pick hard and want the pedal to bark back, the OCD\u2019s MOSFET clipping made it a modern classic.</strong> The Class-A JFET input keeps dynamics alive, the HP/LP switch voices it from clean boost to full distortion, and the internal Enhanced/True bypass switch protects your chain either way. It runs 9V battery or 9\u201318V adapter at 8mA. It is for players who ride their volume knob. Check used-market version confusion (v1 vs v2) if buying secondhand.',
  '<strong>Si atacas fuerte y quieres que el pedal responda, el clipping MOSFET del OCD lo hizo un clásico moderno.</strong> La entrada JFET en clase A mantiene viva la dinámica, el switch HP/LP lo lleva de clean boost a distorsión total, y el bypass interno Enhanced/True protege tu cadena en ambos modos. Funciona con pila 9V o adaptador 9\u201318V a 8 mA. Es para quienes tocan con el volumen de la guitarra. Si compras de segunda mano, revisa la confusión de versiones (v1 vs v2).',
  [581]
));
g.sections.push(SEC(
  'Klon Magic With a 3-Band EQ: Tumnus Deluxe',
  'Magia Klon con EQ de 3 bandas: Tumnus Deluxe',
  '<strong>If you love the Klon sound but need real tone controls, the Tumnus Deluxe adds active bass and mids to the recipe.</strong> The Normal/Hot switch covers boost to higher gain, top-mounted jacks save board space, and the side switch flips between buffered and true bypass. Built in the USA with a 5-year warranty, 9V only at 70mA. It is for always-on sweetening and pushing driven amps. Check 9V-only operation fits your supply.',
  '<strong>Si amas el sonido Klon pero necesitas controles de tono de verdad, el Tumnus Deluxe suma graves y medios activos a la receta.</strong> El switch Normal/Hot cubre de boost a alta ganancia, los jacks superiores ahorran sitio, y el lateral alterna bypass con buffer o true. Hecho en EE. UU. con 5 años de garantía, solo 9V a 70 mA. Es para endulzar siempre activo y empujar amplis saturados. Comprueba que el solo-9V encaja en tu fuente.',
  [582]
));
g.sections.push(SEC(
  'Always-On Transparency: Morning Glory V4',
  'Transparencia always-on: Morning Glory V4',
  '<strong>If your amp is almost there and needs a transparent push, the Morning Glory adds grit without changing your tone.</strong> The gain toggle doubles as a Red Remote-accessible boost, the side bright-cut tames harsh rigs, and 2x headroom keeps it open. True bypass, 9V and 43mA in a small box. It is for low-gain lovers and boost stacking. Check the Red Remote is sold separately if you want footswitchable gain.',
  '<strong>Si tu ampli casi llega y necesita un empujón transparente, el Morning Glory añade grano sin cambiar tu tono.</strong> El toggle de ganancia dobla como boost vía Red Remote, el bright-cut lateral doma equipos ásperos, y el doble headroom lo mantiene abierto. True bypass, 9V y 43 mA en caja pequeña. Es para amantes del low-gain y apilar boosts. Ten en cuenta que el Red Remote se vende por separado si quieres la ganancia al pie.',
  [583]
));
g.sections.push(SEC(
  'Two Knobs of 70s Crunch: Distortion+',
  'Dos mandos de crunch 70s: Distortion+',
  '<strong>If two knobs are all you want to think about, the yellow Distortion+ has delivered 70s crunch for decades.</strong> Germanium diode clipping goes from bluesy breakup to hard-rock saturation with Output and Distortion only, sipping 2.5mA from a 9V battery or adapter. It is for classic rock rhythm and leads on a budget. Check you are happy with hardwire bypass and no tone control.',
  '<strong>Si dos mandos son todo lo que quieres pensar, el Distortion+ amarillo lleva décadas de crunch 70s.</strong> El clipping con germanio va de breakup blusero a saturación hard-rock solo con Output y Distortion, con 2,5 mA de una pila 9V o adaptador. Es para rítmicas y solos de rock clásico con poco presupuesto. Asegúrate de que te vale el bypass hardwire sin control de tono.',
  [584]
));
g.sections.push(SEC(
  'Waza Craft Grit: BD-2W Blues Driver',
  'Grit Waza Craft: BD-2W Blues Driver',
  '<strong>If the BD-2 earned its place but you want the premium take, the BD-2W rebuilds it with discrete analog circuitry in Japan.</strong> Standard mode keeps the classic smoky grit while Custom adds body and sustain, both responding to picking dynamics and volume cleanup. Buffered bypass, 9V battery or adapter at 18mA, 5-year warranty. It is for transparent breakup from boost to dirt. Check budget versus the standard BD-2.',
  '<strong>Si el BD-2 se ganó su sitio pero quieres la versión premium, el BD-2W lo reconstruye con circuitería discreta en Japón.</strong> El modo Standard mantiene el grit ahumado clásico mientras Custom suma cuerpo y sustain, ambos con respuesta a la dinámica y limpieza con el volumen. Bypass con buffer, pila 9V o adaptador a 18 mA, 5 años de garantía. Es para breakup transparente de boost a dirt. Valora el presupuesto frente al BD-2 estándar.',
  [585]
));
console.log('5 sections added');

g.featuredProducts = [96, 133, 134, 136, 581, 582, 583, 584, 585];
console.log('featured extended');

// Table fixes (verified: zzounds/Sweetwater/official specs)
const row = label => {
  const r = g.productTable.rows.find(rr => rr.label === label);
  if (!r) throw new Error('no row ' + label);
  return r;
};
const setCell = (label, i, en, es) => {
  const r = row(label);
  if (r.values[i].value !== en.from) throw new Error(label + ' [' + i + '] EN unexpected: ' + r.values[i].value);
  if (r.values[i].value_es !== es.from) throw new Error(label + ' [' + i + '] ES unexpected: ' + r.values[i].value_es);
  r.values[i].value = en.to; r.values[i].value_es = es.to;
};
// prices
setCell('Estimated Price', 3, { from: '$179.00', to: '$168.45–$179.00' }, { from: '$179.00', to: '$168.45–$179.00' });
setCell('Estimated Price', 7, { from: '$184.99', to: '$184.99–$186.99' }, { from: '$184.99', to: '$184.99–$186.99' });
// current draw
setCell('Current Draw', 3, { from: '15 mA', to: '8 mA' }, { from: '15 mA', to: '8 mA' });
setCell('Current Draw', 4, { from: '30 mA', to: '70 mA' }, { from: '30 mA', to: '70 mA' });
setCell('Current Draw', 5, { from: '8 mA', to: '43 mA' }, { from: '8 mA', to: '43 mA' });
setCell('Current Draw', 6, { from: '5 mA', to: '2.5 mA' }, { from: '5 mA', to: '2.5 mA' });
setCell('Current Draw', 7, { from: '25 mA', to: '18 mA' }, { from: '25 mA', to: '18 mA' });
// sizes
setCell('Size', 4, { from: '112 x 60 x 50 mm', to: '114 x 64 x 38 mm' }, { from: '112 x 60 x 50 mm', to: '114 x 64 x 38 mm' });
setCell('Size', 5, { from: '112 x 60 x 50 mm', to: '122 x 66 x 41 mm' }, { from: '112 x 60 x 50 mm', to: '122 x 66 x 41 mm' });
setCell('Size', 6, { from: '73 x 111 x 50 mm', to: '108 x 57 x 32 mm' }, { from: '73 x 111 x 50 mm', to: '108 x 57 x 32 mm' });
setCell('Size', 7, { from: '112 x 60 x 50 mm', to: '73 x 129 x 59 mm' }, { from: '112 x 60 x 50 mm', to: '73 x 129 x 59 mm' });
// bypass
setCell('Bypass', 3, { from: 'True Bypass', to: 'True / Enhanced switchable' }, { from: 'True Bypass', to: 'True / Enhanced conmutable' });
setCell('Bypass', 7, { from: 'Buffered / True Bypass switchable', to: 'Buffered' }, { from: 'Buffered / True Bypass conmutable', to: 'Buffered' });
// power
setCell('Power', 5, { from: '9V DC / Battery', to: '9V DC' }, { from: '9V DC / Batería', to: '9V DC' });
setCell('Power', 7, { from: '9V DC', to: '9V DC / Battery' }, { from: '9V DC', to: '9V DC / Batería' });
console.log('table cells fixed');

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
