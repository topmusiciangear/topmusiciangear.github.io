const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');
console.log('claves de la guia: ' + Object.keys(g).join(', '));
console.log('\n--- sections (' + (g.sections || []).length + ') ---');
(g.sections || []).forEach((s, i) => {
  console.log(i + ') heading=' + JSON.stringify(s.heading || s.h || null));
  console.log('   heading_es=' + JSON.stringify(s.heading_es || s.h_es || null));
  console.log('   products=' + JSON.stringify(s.products));
  console.log('   claves: ' + Object.keys(s).join(','));
});
console.log('\n--- verdictProsCons (' + (g.verdictProsCons || []).length + ') ---');
(g.verdictProsCons || []).forEach(v => console.log('  * ' + JSON.stringify(v.name || v.title)));
console.log('\n--- productTable ---');
if (g.productTable) console.log('  columns: ' + g.productTable.columns.map(c => c.title).join(' | '));
console.log('\n--- featuredProducts (' + (g.featuredProducts || []).length + ') ---');
console.log('  ' + JSON.stringify(g.featuredProducts));