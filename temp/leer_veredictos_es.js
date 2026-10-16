const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('######## TABLA ES ########');
s.productTable.rows.forEach(r => {
  console.log('\n[' + r.label_es + ']');
  r.values.forEach(v => console.log('  - ' + v.value_es));
});
s.verdictProsCons.forEach(v => {
  console.log('\n\n######## VEREDICTO ' + v.name_es + ' ########');
  console.log('PROS:'); v.pros_es.forEach(x => console.log('  + ' + x));
  console.log('CONTRAS:'); v.cons_es.forEach(x => console.log('  - ' + x));
});
