// Intro, conclusion, veredicto global y FAQ con la nueva estructura de 3 monitores
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);

function cam(campo, pares, etiqueta) {
  if (typeof guia[campo] !== 'string') { no(campo + ': no es texto'); return; }
  let t = guia[campo], n = 0;
  pares.forEach(([v, nv]) => { if (t.indexOf(v) > -1) { t = t.replace(v, nv); n++; } });
  guia[campo] = t;
  (n ? ok : no)(etiqueta + ': ' + n + '/' + pares.length + ' cambios');
  if (n < pares.length) pares.forEach(([v]) => { if (t.indexOf(v) > -1) log.push('        no aplicado: "' + v.slice(0, 60) + '"'); });
}

/* ── INTRO ── */
cam('intro', [
  ['the one with real monitors to <strong>$905</strong>', 'the one with 7-inch monitors to <strong>$1,393</strong>'],
  ['<strong>$545</strong>, the middle to <strong>$816</strong>', '<strong>$1,003</strong>, the middle to <strong>$1,113</strong>'],
  ['Three builds sit below, assembled from individual products and priced from our own catalogue.',
   'Three builds sit below, assembled from individual products and priced from our own catalogue. Every one of them ships with powered studio monitors — which is where most budget guides stop.']
], 'intro');

cam('intro_es', [
  ['el que lleva monitores de verdad por <strong>$905</strong>', 'el de monitores de 7 pulgadas por <strong>$1.393</strong>'],
  ['<strong>$545</strong>, el intermedio por <strong>$816</strong>', '<strong>$1.003</strong>, el intermedio por <strong>$1.113</strong>'],
  ['Abajo hay tres montajes, armados con productos sueltos y con precios de nuestro propio catálogo.',
   'Abajo hay tres montajes, armados con productos sueltos y con precios de nuestro propio catálogo. Los tres vienen con monitores de estudio alimentados, que es justo donde la mayoría de guías económicas se detiene.']
], 'intro_es');

/* ── CONCLUSION ── */
cam('conclusion', [
  ['Start with the Budget build.', 'Start with Tier 1.'],
  ['Add the Rokit 7 G5 pair only when you have treated the room and you need to judge low end.',
   'Move up to Tier 2 when you are mixing other people’s work or selling it; move to Tier 3 when you need to judge low end physically rather than guess at it.'],
  ['And whatever you spend on the rest, do not skip the panels.',
   'And whatever you spend on the rest, do not skip the panels.']
], 'conclusion');

cam('conclusion_es', [
  ['Empieza por el montaje Básico.', 'Empieza por el Nivel 1.'],
  ['Añade el par de Rokit 7 G5 solo cuando hayas tratado la sala y necesites juzgar el grave.',
   'Sube al Nivel 2 cuando ya mezcles o vendas trabajo de otros; pasa al Nivel 3 cuando necesites juzgar el grave de forma física en vez de suponerlo.'],
  ['Y gastes lo que gastes en lo demás, no te saltes los paneles.',
   'Y gastes lo que gastes en lo demás, no te saltes los paneles.']
], 'conclusion_es');

/* ── FAQ ── */
const faq = guia.featuredSnippet;
const faqOps = [
  ['faq_a1_es', 'La Scarlett 2i2 es la compra inicial más segura.', 'La Scarlett 2i2 es la compra inicial más segura.'],
  ['faq_a3_es', 'Sí, son los mejores auriculares económicos para mezclar en un estudio de inicio.',
   'Sí, son los mejores auriculares económicos para mezclar en un estudio de inicio.'],
  ['faq_a4_en', 'Yes, they are built for bedroom producers.', 'Yes, they are built for bedroom producers.'],
  ['faq_a4_es', 'Sí, están hechos para productores de dormitorio. El KRK Rokit 7 G5 (unos $538 el par) tiene corrección de sala DSP y puerto frontal, así que un principiante puede ajustar la respuesta de graves a su acústica sin gastar en tratamiento.',
   'Sí, están hechos para productores de dormitorio. El KRK Rokit 7 G5 (unos $538 el par) tiene corrección de sala DSP y puerto frontal, así que un principiante puede ajustar la respuesta de graves a su acústica sin gastar en tratamiento.'],
  ['faq_a5_en', 'Focus your budget in this order: a capable audio interface first, a large-diaphragm condenser, a pair of monitors or headphones you know well, acoustic panels, and then everything else.',
   'Focus your budget in this order: a capable audio interface first, a large-diaphragm condenser, a pair of powered monitors, acoustic panels, and then the headphones.'],
  ['faq_a5_es', 'Enfoca tu presupuesto en este orden: primero una interfaz de audio capaz, un condensador de diafragma grande, un par de monitores o auriculares que conozcas bien, paneles acústicos y luego todo lo demás.',
   'Enfoca tu presupuesto en este orden: primero una interfaz de audio capaz, un condensador de diafragma grande, un par de monitores alimentados, paneles acústicos y después los auriculares.'],
  ['faq_a2_en', 'Pair it with the four acoustic panels before anything else — an untreated room records the room, not the voice.',
   'Pair it with the four acoustic panels and a pair of powered monitors before anything else — an untreated room records the room, not the voice.'],
  ['faq_a2_es', 'Pairéalo con los cuatro paneles acústicos antes que con cualquier otra cosa: una sala sin tratar graba la sala, no la voz.',
   'Pairéalo con los cuatro paneles acústicos y con un par de monitores alimentados antes que con cualquier otra cosa: una sala sin tratar graba la sala, no la voz.']
];
faqOps.forEach(([campo, viejo, nuevo]) => {
  if (faq[campo] && faq[campo].indexOf(viejo) > -1) { faq[campo] = faq[campo].replace(viejo, nuevo); ok('FAQ ' + campo); }
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* ── BARRIDO DE RESTOS ── */
const json = JSON.stringify(guia);
console.log('\n=== RESTOS ===');
['$545', '$816', '$905', '$925', 'Only tier that can mix', 'Solo 级'].forEach(p => {
  const n = (json.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) console.log('  RESTA x' + n + '  "' + p + '"');
});
['$1,003', '$1,113', '$1,393', '$1.003', '$1.113', '$1.393'].forEach(p => {
  const n = (json.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log('  ' + (n ? 'ok x' + n : 'CERO  ') + '  "' + p + '"');
});
console.log('\n  "Solo auriculares" / "Headphones only": ' +
  (json.match(/Solo auriculares/g) || []).length + ' / ' + (json.match(/Headphones only/g) || []).length);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
