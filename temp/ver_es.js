const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8')).find(x => x.id === 'best-home-studio-speakers');
const sinTags = s => s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

console.log('### INTRO_ES\n' + g.intro_es);
console.log('\n### VERDICT_ES\n' + g.verdict_es);
console.log('\n### CONCLUSION_ES\n' + sinTags(g.conclusion_es));

console.log('\n### SECCIONES ES');
g.sections.forEach((s, i) => {
  console.log('\n--- [' + i + '] ' + s.heading_es);
  console.log(sinTags(s.content_es));
});

console.log('\n\n### PROS_ES / CONS_ES');
g.verdictProsCons.forEach(v => {
  console.log('\n* ' + v.name_es);
  v.pros_es.forEach(p => console.log('   + ' + p));
  v.cons_es.forEach(c => console.log('   - ' + c));
});

console.log('\n\n### TABLA ES');
console.log('titulo: ' + g.productTable.title_es);
g.productTable.rows.forEach(r => {
  console.log('  ' + r.label_es.padEnd(26) + ' | ' + r.values.map(v => v.value_es).join(' | '));
});
