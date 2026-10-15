// Precios viejos en intro y description + dos errores de logica/traduccion
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const log = [];
const sub = (campo, pares) => {
  let t = s[campo];
  const antes = t;
  pares.forEach(([a, b]) => {
    if (typeof a === 'string') { t = t.split(a).join(b); return; }
    t = t.replace(a, b);
  });
  if (t !== antes) { s[campo] = t; log.push('  ok    ' + campo); }
  else log.push('  ---   ' + campo + ' sin cambios');
};

/* 1) INTRO */
sub('intro', [
  ['Tier 1 comes to <strong>$998</strong>, Tier 2 to <strong>$1,077</strong>, and the definitive studio to <strong>$2,537</strong>.',
   'Tier 1 comes to <strong>$900</strong>, Tier 2 to <strong>$1,357</strong>, and the definitive studio to <strong>$2,797</strong>.']
]);
sub('intro_es', [
  ['El Nivel 1 sale por <strong>$998</strong>, el Nivel 2 por <strong>$1.077</strong> y el estudio definitivo por <strong>$2.537</strong>.',
   'El Nivel 1 sale por <strong>$900</strong>, el Nivel 2 por <strong>$1.357</strong> y el estudio definitivo por <strong>$2.797</strong>.']
]);

/* 2) DESCRIPTION (vigilar limite de 155 chars / 920px) */
sub('description', [
  ['What $998, $1,077 and $2,537 actually buy',
   'What $900, $1,357 and $2,797 actually buy']
]);
sub('description_es', [
  ['Qué compran $998, $1.077 y $2.537',
   'Qué compran $900, $1.357 y $2.797']
]);

/* 3) CONCLUSION: decia "Move up to Tier 2" cuando hablab del Nivel 3 */
sub('conclusion', [
  ['Move up to Tier 2 when you are mixing other people’s work or selling it; Tier 3 is the one that doubles the budget',
   'Move up to Tier 3 when you are mixing other people’s work or selling it; it is the build that doubles the budget']
]);
sub('conclusion_es', [
  ['Sube al Nivel 2 cuando ya mezcles o vendas trabajo de otros; el Nivel 3 es el que duplica el presupuesto',
   'Sube al Nivel 3 cuando ya mezcles o vendas trabajo de otros; es el montaje que duplica el presupuesto']
]);

/* 4) featuredSnippet: "Pairéalo" no es una palabra */
const sn = s.featuredSnippet;
if (typeof sn === 'string' && /Pairéalo/.test(sn)) {
  s.featuredSnippet = sn.replace(/Pairéalo/g, 'Combínalo');
  log.push('  ok    featuredSnippet: "Pairéalo" -> "Combínalo"');
} else if (sn && typeof sn === 'object' && sn.faq_a2_es && /Pairéalo/.test(sn.faq_a2_es)) {
  sn.faq_a2_es = sn.faq_a2_es.replace(/Pairéalo/g, 'Combínalo');
  log.push('  ok    featuredSnippet.faq_a2_es: "Pairéalo" -> "Combínalo"');
} else log.push('  ---   Pairéalo no encontrado');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const txt = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
console.log('  precios viejos restantes : ' + (txt.match(/\$998|\$1\.077|\$1,077|\$2\.537|\$2,537/g) || []).length);
console.log('  precios nuevos presentes : ' + ['$900', '$1,357', '$2,797', '$1.357', '$2.797'].filter(p => txt.includes(p)).join(', '));
console.log('  "Move up to Tier 2"      : ' + (txt.includes('Move up to Tier 2') ? 'AUN (mal)' : 'corregido'));
console.log('  "Pairéalo"               : ' + (txt.includes('Pairéalo') ? 'AUN (mal)' : 'corregido'));
console.log('  desc EN  : ' + s2.description.length + ' chars');
console.log('  desc ES  : ' + s2.description_es.length + ' chars');
console.log('  mojibake : ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);

/* TABLA */
console.log('\n=== TABLA final ===');
s2.productTable.rows.forEach(r => {
  console.log('  ' + r.label);
  r.values.forEach((v, i) => console.log('      N' + (i + 1) + ': ' + v.value));
});
