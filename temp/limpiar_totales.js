// Limpiar los totales antiguos de intro / conclusion / FAQ / monitors
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const log = [];

function sub(campo, pares, etiqueta) {
  if (typeof guia[campo] !== 'string') { log.push('  --   ' + etiqueta + ': no es texto'); return; }
  let t = guia[campo], n = 0;
  pares.forEach(([v, nv]) => { if (t.indexOf(v) > -1) { t = t.replace(v, nv); n++; } });
  guia[campo] = t;
  log.push('  ' + (n ? 'ok  ' : 'FALTA  ') + etiqueta + ': ' + n + '/' + pares.length);
  pares.forEach(([v]) => { if (t.indexOf(v) > -1) log.push('        no aplicado: "' + v.slice(0, 60) + '"'); });
}

sub('intro', [
  ['Tier 1 comes to <strong>$1,003</strong>, Tier 2 to <strong>$1,113</strong>, and the one with 7-inch monitors to <strong>$1,393</strong>.',
   'Tier 1 comes to <strong>$998</strong>, Tier 2 to <strong>$1,077</strong>, and the definitive studio to <strong>$2,537</strong>.']
], 'intro');

sub('intro_es', [
  ['El Nivel 1 sale por <strong>$1.003</strong>, el Nivel 2 por <strong>$1.113</strong> y el de monitores de 7 pulgadas por <strong>$1.393</strong>.',
   'El Nivel 1 sale por <strong>$998</strong>, el Nivel 2 por <strong>$1.077</strong> y el estudio definitivo por <strong>$2.537</strong>.']
], 'intro_es');

sub('description', [
  ['What $1,003, $1,113 and $1,393 actually buy', 'What $998, $1,077 and $2,537 actually buy']
], 'description');

sub('description_es', [
  ['Qué compran $1.003, $1.113 y $1.393', 'Qué compran $998, $1.077 y $2.537']
], 'description_es');

sub('conclusion', [
  ['Move up to Tier 2 when you are mixing other people’s work or selling it; move to Tier 3 when you need to judge low end physically rather than guess at it.',
   'Move up to Tier 2 when you are mixing other people’s work or selling it; Tier 3 is the one that doubles the budget, and it is the point where analogue modelling and a Neumann capsule stop being luxuries.'],
  ['The Pro Producer is the one to buy if you are going to sing.',
   'Tier 2 is the one to buy if you are going to sing.']
], 'conclusion');

sub('conclusion_es', [
  ['Sube al Nivel 2 cuando ya mezcles o vendas trabajo de otros; pasa al Nivel 3 cuando necesites juzgar el grave de forma física en vez de suponerlo.',
   'Sube al Nivel 2 cuando ya mezcles o vendas trabajo de otros; el Nivel 3 es el que duplica el presupuesto, y es el punto en el que el modelado analógico y una cápsula Neumann dejan de ser lujos.'],
  ['El Productor Profesional es el que hay que comprar si vas a cantar.',
   'El Nivel 2 es el que hay que comprar si vas a cantar.']
], 'conclusion_es');

// FAQ
const f = guia.featuredSnippet;
[['faq_a2_en', 'a pair of powered monitors, acoustic panels, and then the headphones.',
  'a pair of powered monitors, acoustic panels, and then the headphones — Tier 2 is where you add the 32-bit float microphone.'],
 ['faq_a2_es', 'un par de monitores alimentados, paneles acústicos y después los auriculares.',
  'un par de monitores alimentados, paneles acústicos y después los auriculares; el Nivel 2 es donde añades el micrófono de 32 bits float.'],
 ['faq_a4_es', 'Sí, están hechos para productores de dormitorio.',
  'Sí, están hechos para productores de dormitorio.']]
  .forEach(([campo, v, nv]) => {
    if (f[campo] && f[campo].indexOf(v) > -1) { f[campo] = f[campo].replace(v, nv); log.push('  ok   FAQ ' + campo); }
  });

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio'));
console.log('\n=== RESTOS ===');
['$1,003', '$1,113', '$1,393', '$1.003', '$1.113', '$1.393', '$1,223', '$1.223', '$605', '$925', '$690', '$850'].forEach(p => {
  const n = (t.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) console.log('  RESTA x' + n + '  ' + p);
});
console.log('\n  numeros nuevos: $998 x' + (t.match(/\$998/g) || []).length +
  ', $1,077 x' + (t.match(/\$1,077/g) || []).length +
  ', $2,537 x' + (t.match(/\$2,537/g) || []).length +
  ', $1.077 x' + (t.match(/\$1\.077/g) || []).length +
  ', $2.537 x' + (t.match(/\$2\.537/g) || []).length);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
