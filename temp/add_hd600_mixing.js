const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'best-headphones-for-mixing');
assertEq(JSON.stringify(o.featuredProducts), JSON.stringify([56, 25, 26, 24]), 'feat');
o.featuredProducts.push(422);
o.sections.push({
  heading: 'The Flat Middle: Is the HD 600 the Sweet Spot for Serious Mixing?',
  heading_es: 'El punto plano intermedio: ¿es el HD 600 el punto ideal para mezcla seria?',
  content: '<p><strong>Between the bright DT 990 Pro and flagship money sits thirty years of neutral.</strong> The HD 600 has been the mixing yardstick since 1997: a flat midrange that reports vocals, guitars and snares without the DT 990 treble peak that fatigues ears and triggers harsh EQ cuts. Mixes built here translate because nothing was flattered.</p><p>The open-back design breathes like a treated room, and every wearable part is replaceable — decades-old pairs still work daily. The honest catch is 300 ohms: it demands a real headphone amp, and a weak laptop jack leaves it quiet and dull.</p><p>It will not track (open-back, zero isolation) or travel. For the mixer who finds the DT 990 fatiguing and the HD 490 Pro Plus over budget, the HD 600 is the sweet-spot reference that two generations of engineers never outgrew.</p>',
  content_es: '<p><strong>Entre el brillante DT 990 Pro y el dinero insignia hay treinta años de neutralidad.</strong> El HD 600 ha sido la vara de medir de la mezcla desde 1997: medios planos que reportan voces, guitarras y cajas sin el pico de agudos del DT 990 que fatiga oídos y provoca cortes duros de EQ. Las mezclas hechas aquí se traducen porque nada fue adulado.</p><p>El diseño abierto respira como una sala tratada, y cada pieza de desgaste es reemplazable — pares de hace décadas siguen trabajando a diario. La contrapartida honesta son los 300 ohmios: exige un amplificador de auriculares de verdad, y una salida floja de laptop los deja bajos y apagados.</p><p>No sirve para grabar (abierto, cero aislamiento) ni para viajar. Para quien mezcla y encuentra fatigante el DT 990 y caro el HD 490 Pro Plus, el HD 600 es la referencia de punto ideal que dos generaciones de ingenieros nunca superaron.</p>',
  products: [422]
});
assertEq(o.productTable.columns.length, 5, 'cols');
o.productTable.columns.push({ title: 'Sennheiser HD 600', title_es: 'Sennheiser HD 600' });
function col(label, en, es) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 5, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Best For', 'Sweet-spot flat mixing reference', 'Referencia plana de punto ideal');
col('Estimated Price', '$279–$304', '$279–$304');
col('Type', 'Open-back', 'Abiertos');
col('Driver Size', '42mm', '42mm');
col('Impedance', '300 Ω', '300 Ω');
col('Sensitivity', '97 dB', '97 dB');
col('Frequency Response', '12 Hz – 40 kHz', '12 Hz – 40 kHz');
col('Cable', 'Detachable (single-sided)', 'Desmontable (unilateral)');
col('Weight', '260 g', '260 g');
const ep = o.productTable.rows.find(x => x.label === 'Ear Pads');
if (ep) { assertEq(ep.values.length, 5, 'pads'); ep.values.push({ value: 'Velour, replaceable', value_es: 'Velour, reemplazables' }); }
o.verdictProsCons.push({
  name: 'Sennheiser HD 600',
  name_es: 'Sennheiser HD 600',
  pros: [
    'The neutral yardstick since 1997 — mixes translate',
    'Flat midrange with none of the DT 990 treble fatigue',
    'Every wearable part replaceable for decades of use',
    'Sweet-spot price between fatiguing entry and flagship cost'
  ],
  pros_es: [
    'La vara de medir neutra desde 1997 — las mezclas se traducen',
    'Medios planos sin la fatiga de agudos del DT 990',
    'Cada pieza de desgaste reemplazable para décadas de uso',
    'Precio de punto ideal entre entrada fatigante y coste insignia'
  ],
  cons: [
    '300 ohms demands a real headphone amp',
    'Open-back means zero tracking use',
    'Needs a quiet room to judge properly',
    'Dated marble looks next to modern designs'
  ],
  cons_es: [
    'Los 300 ohmios exigen un amplificador de auriculares de verdad',
    'Lo abierto significa cero uso para grabar',
    'Necesita una sala silenciosa para juzgar bien',
    'Estética mármol veterana junto a diseños modernos'
  ]
});
function rep(field, from, to) {
  if (!o[field].includes(from)) throw new Error('no ' + field + ': ' + from.slice(0, 60));
  o[field] = o[field].split(from).join(to);
}
rep('conclusion', 'The Audio-Technica ATH-M50x is the most versatile option for producers who need one headphone for everything.', 'The Audio-Technica ATH-M50x is the most versatile option for producers who need one headphone for everything. Between the fatiguing DT 990 Pro and flagship money, the Sennheiser HD 600 is the sweet-spot flat reference.');
rep('conclusion_es', 'Los Audio-Technica ATH-M50x son la opción más versátil.', 'Los Audio-Technica ATH-M50x son la opción más versátil. Entre el fatigante DT 990 Pro y el dinero insignia, los Sennheiser HD 600 son la referencia plana de punto ideal.');
rep('verdict', 'If you record and mix, both are worth owning.', 'If you record and mix, both are worth owning. The HD 600 is the sweet spot when the DT 990 fatigues and the HD 490 Pro Plus overreaches the budget.');
rep('verdict_es', 'Si grabas y mezclas, ambos valen la pena.', 'Si grabas y mezclas, ambos valen la pena. Los HD 600 son el punto ideal cuando el DT 990 fatiga y el HD 490 Pro Plus supera el presupuesto.');
console.log('mixing guide: HD600 added');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
