const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8')).find(x => x.id === 'best-home-studio-speakers');
const sinTags = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

console.log('### CONCLUSION EN\n' + sinTags(g.conclusion));
console.log('\n### CONCLUSION ES\n' + sinTags(g.conclusion_es));
console.log('\n### VERDICT EN\n' + g.verdict);
console.log('\n### VERDICT ES\n' + g.verdict_es);
console.log('\n### INTRO EN\n' + sinTags(g.intro));
console.log('\n### INTRO ES\n' + sinTags(g.intro_es));
console.log('\n### CABECERAS DE SECCION (EN | ES)');
g.sections.forEach(s => console.log('  ' + s.heading.slice(0, 58) + '\n      ' + s.heading_es.slice(0, 58)));
console.log('\n### PROS/CONS');
g.verdictProsCons.forEach(v => {
  console.log('\n* ' + v.name + '  [' + v.pros.length + ' pros / ' + v.cons.length + ' cons]');
  v.pros.forEach(x => console.log('   + ' + x));
  v.cons.forEach(x => console.log('   - ' + x));
});
console.log('\n### TABLA');
g.productTable.rows.forEach(r => console.log('  ' + r.label_es.padEnd(28) + ' | ' + r.values.map(v => v.value_es).join(' | ')));
console.log('\n  columnas: ' + g.productTable.columns.map(c => c.title).join(' | '));
console.log('\n### MENCIONES DE PRODUCTOS RETIRADOS EN TODO EL JSON');
const txt = JSON.stringify(g);
['Edifier MR3', 'Eris E4.5', 'JBL 104-BT', 'CR3.5BT', 'Yale', 'Superlux'].forEach(k => {
  const n = (txt.split(k).length - 1);
  console.log('  ' + k + ': ' + n);
});
