const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-bass-like-expensive');
const OUT = ['Affinity', 'Hofner', 'American Professional', 'Ultra II'];
const whole = JSON.stringify(g);
console.log('--- menciones de salientes por campo ---');
[['verdict', g.verdict], ['verdict_es', g.verdict_es], ['conclusion', g.conclusion], ['conclusion_es', g.conclusion_es],
 ['description', g.description], ['description_es', g.description_es], ['intro', g.intro], ['intro_es', g.intro_es]].forEach(([k, v]) => {
  OUT.forEach(w => { const n = (String(v).split(w).length - 1); if (n) console.log('  ' + k + ' :: "' + w + '" x' + n); });
});
console.log('\n--- featuredSnippet ---');
const f = g.featuredSnippet;
OUT.forEach(w => console.log('  "' + w + '" x' + (JSON.stringify(f).split(w).length - 1)));
console.log('\n--- contenido secciones 0,6,7,8,9,10,12,14 ---');
[0, 6, 7, 8, 9, 10, 12, 14].forEach(i => {
  const s = g.sections[i];
  console.log('[' + i + '] ' + s.heading + ' | prods=' + JSON.stringify(s.products));
  const found = OUT.filter(w => (s.content + (s.content_es || '')).includes(w));
  if (found.length) console.log('   !! menciona salientes: ' + found.join(', '));
  console.log('   EN: ' + String(s.content).replace(/<[^>]+>/g, '').slice(0, 300));
  console.log('   ES: ' + String(s.content_es || '').replace(/<[^>]+>/g, '').slice(0, 200));
});
console.log('\n--- seccion 1 (Affinity, se va) long: ' + String(g.sections[1].content).length + ' ES: ' + String(g.sections[1].content_es).length);
console.log('\n--- filas de la tabla: ' + g.productTable.rows.map(r => r.label).join(' | '));
console.log('--- csv/index actual de columnas:');
g.productTable.columns.forEach((c, i) => console.log('  ' + i + ': ' + c.title + ' || ' + c.title_es));
console.log('\n--- verdictProsCons detalle de los salientes ---');
g.verdictProsCons.filter(v => OUT.some(w => v.name.includes(w))).forEach(v => {
  console.log(' * ' + v.name + ' (' + v.pros.length + '+' + v.cons.length + ')');
});