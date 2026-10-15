const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

console.log('########## TABLA: filas que hay que tocar ##########');
[4, 6, 7].forEach(i => {
  const r = guia.productTable.rows[i];
  console.log('\n--- fila ' + i + ': ' + r.label + ' / ' + r.label_es + ' ---');
  r.values.forEach((v, j) => console.log('  col ' + j + ' EN: ' + v.value + '\n         ES: ' + v.value_es));
});

console.log('\n\n########## SECCIONES afectadas ##########');
[1, 3, 6, 7, 17].forEach(i => {
  const s = guia.sections[i];
  console.log('\n=========== [' + i + '] ' + s.heading + ' ===========');
  console.log('ES: ' + s.heading_es);
  console.log('productos: ' + JSON.stringify(s.products));
  console.log('\nCONTENIDO EN:\n' + s.content);
  console.log('\nCONTENIDO ES:\n' + s.content_es);
});

console.log('\n\n########## VEREDICTOS a quitar (Rokit 5, JBL) ##########');
guia.verdictProsCons.filter(v => /Rokit 5|JBL 305/i.test(v.name)).forEach(v => {
  console.log('\n--- ' + v.name + ' ---');
  console.log('pros: ' + JSON.stringify(v.pros, null, 1));
  console.log('cons: ' + JSON.stringify(v.cons, null, 1));
});
