const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x => x.title === 'Best Home Studio Starter Kits Under $1,000')
  || guides.find(x => x.id === 'starter-studio');
if (!g) { console.log('NO ENCONTRADA'); process.exit(0); }
console.log('id:       ' + g.id);
console.log('title:    ' + g.title);
console.log('title_es: ' + g.title_es);
console.log('category: ' + g.category);
console.log('image:    ' + g.image);
console.log('featuredProducts: ' + JSON.stringify(g.featuredProducts));
console.log('relatedGuides:    ' + JSON.stringify(g.relatedGuides));
console.log('productTable cols: ' + (g.productTable ? g.productTable.columns.length : 'sin tabla'));
console.log('verdictProsCons:   ' + (g.verdictProsCons ? g.verdictProsCons.length : 0));
console.log('sections:          ' + (g.sections ? g.sections.length : 0));
// Quien la referencia
const refs = [];
guides.forEach(x => {
  if (x.id === g.id) return;
  const s = JSON.stringify(x);
  if (s.indexOf(g.id) > -1) refs.push(x.id);
});
console.log('\nguias que la referencian: ' + refs.length);
refs.forEach(r => console.log('  ' + r));
// Archivos en disco
['guides/starter-studio.html','guides/starter-studio_es.html'].forEach(f => {
  const p = BASE + f;
  console.log('\n' + f + ': ' + (fs.existsSync(p) ? 'existe (' + fs.statSync(p).size + ' bytes)' : 'no existe'));
});