const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'best-headphones');
assertEq(o.productTable.columns.length, 6, 'cols');
assertEq(o.verdictProsCons.length, 6, 'verdicts');

o.sections.push({
  heading: 'Flat Since 1997: Is the HD 600 Still the Honest Mid-Price Reference?',
  heading_es: 'Plano desde 1997: ¿sigue el HD 600 siendo la referencia honesta de precio medio?',
  content: '<p><strong>Before forums, before hype cycles, there was the HD 600 — and it never left.</strong> Since 1997 this has been the yardstick for neutral: a flat midrange that shows vocals, guitars and snares exactly as they are, with none of the DT 990 treble peak that causes fatigue and harsh EQ calls. Mixes built on the HD 600 translate because nothing was flattered in the first place.</p><p>The open-back design breathes like a good room, and every part — cable, pads, headband, drivers — is replaceable, so pairs from decades ago still work daily. At 300 ohms it demands a real headphone amp; a weak laptop jack leaves it quiet and dull, which is the honest price of its scaling.</p><p>It will not flatter, isolate, or travel: open-back means zero tracking use, and the marble finish divides opinions. For the mixer caught between the fatiguing DT 990 and flagship money, the HD 600 is the reference that ended the search for two generations of engineers.</p>',
  content_es: '<p><strong>Antes de los foros, antes del hype, estaba el HD 600 — y nunca se fue.</strong> Desde 1997 esta ha sido la vara de medir de lo neutro: medios planos que muestran voces, guitarras y cajas tal como son, sin el pico de agudos del DT 990 que causa fatiga y decisiones duras de EQ. Las mezclas hechas en los HD 600 se traducen porque nada fue adulado desde el principio.</p><p>El diseño abierto respira como una buena sala, y cada pieza — cable, almohadillas, diadema, drivers — es reemplazable, así pares de hace décadas siguen trabajando a diario. Con 300 ohmios exige un amplificador de auriculares de verdad; una salida floja de laptop los deja bajos y apagados, que es el precio honesto de su escalado.</p><p>No adula, no aísla ni viaja: lo abierto significa cero uso para grabar, y el acabado mármol divide opiniones. Para quien mezcla atrapado entre los agudos fatigantes del DT 990 y el dinero insignia, el HD 600 es la referencia que terminó la búsqueda de dos generaciones de ingenieros.</p>',
  products: [422]
});
o.productTable.columns.push({ title: 'Sennheiser HD 600', title_es: 'Sennheiser HD 600' });
function col(label, en, es) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 6, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Best For', 'Mid-price flat mixing reference', 'Referencia plana de precio medio');
col('Estimated Price', '$279–$304', '$279–$304');
col('Type', 'Open-back', 'Abiertos');
col('Driver Size', '42mm', '42mm');
col('Impedance', '300 Ω', '300 Ω');
col('Sensitivity', '97 dB', '97 dB');
col('Frequency Response', '12 Hz – 40 kHz', '12 Hz – 40 kHz');
col('Cable', 'Detachable (single-sided)', 'Desmontable (unilateral)');
col('Weight', '260 g', '260 g');
// Ear Pads? check if row exists
const ep = o.productTable.rows.find(x => x.label === 'Ear Pads');
if (ep) { assertEq(ep.values.length, 6, 'pads len'); ep.values.push({ value: 'Velour, replaceable', value_es: 'Velour, reemplazables' }); }
o.verdictProsCons.push({
  name: 'Sennheiser HD 600',
  name_es: 'Sennheiser HD 600',
  pros: [
    'The legendary neutral yardstick since 1997 — mixes translate',
    'Flat midrange with none of the DT 990 treble fatigue',
    'Every part replaceable — decades-old pairs still work daily',
    'Open-back breathes like a good room for long sessions'
  ],
  pros_es: [
    'La legendaria vara de medir neutra desde 1997 — las mezclas se traducen',
    'Medios planos sin la fatiga de agudos del DT 990',
    'Cada pieza reemplazable — pares de hace décadas siguen trabajando',
    'Lo abierto respira como una buena sala en sesiones largas'
  ],
  cons: [
    '300 ohms demands a real headphone amp',
    'Open-back means zero use for live tracking',
    'Marble finish divides opinions on looks',
    'Narrower stage and older design next to modern flagships'
  ],
  cons_es: [
    'Los 300 ohmios exigen un amplificador de auriculares de verdad',
    'Lo abierto significa cero uso para grabar tomas',
    'El acabado mármol divide opiniones',
    'Escenario más estrecho y diseño veterano junto a insignias modernas'
  ]
});
function rep(field, from, to) {
  if (!o[field].includes(from)) throw new Error('no ' + field + ': ' + from.slice(0, 60));
  o[field] = o[field].split(from).join(to);
}
rep('conclusion', 'For mixing-focused work, the HD 490 Pro Plus is the most versatile keeper.', 'For mixing-focused work, the HD 490 Pro Plus is the most versatile keeper. Between the fatiguing DT 990 and flagship money sits the HD 600: the legendary flat reference that fixes treble fatigue without the flagship price.');
rep('conclusion_es', 'Si solo pudiera quedarme con uno, sería el HD 490 Pro Plus — pero es porque mezclo más de lo que grabo.', 'Si solo pudiera quedarme con uno, sería el HD 490 Pro Plus — pero es porque mezclo más de lo que grabo. Entre los agudos fatigantes del DT 990 y el dinero insignia están los HD 600: la legendaria referencia plana que corrige la fatiga de agudos sin el precio insignia.');
rep('verdict', 'When your budget allows, step up to the HD 490 Pro Plus for a more open, detailed sound that makes mixing easier.', 'When your budget allows, step up to the HD 490 Pro Plus for a more open, detailed sound that makes mixing easier. The HD 600 fills the middle: legendary flat response for serious mixing without flagship cost.');
rep('verdict_es', 'Cuando tu presupuesto lo permita, sube a los HD 490 Pro Plus para un sonido más abierto y detallado que facilita la mezcla.', 'Cuando tu presupuesto lo permita, sube a los HD 490 Pro Plus para un sonido más abierto y detallado que facilita la mezcla. Los HD 600 llenan el medio: respuesta plana legendaria para mezcla seria sin coste insignia.');
const left = JSON.stringify(o).match(/of the four|de los cuatro|four headphones|cuatro auriculares/gi);
if (left) throw new Error('count left: ' + JSON.stringify(left));
console.log('best-headphones: HD600 added');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
