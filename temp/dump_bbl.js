const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
if (!g) { guides.filter(x => /bass/i.test(x.id)).forEach(x => console.log(x.id + ' | ' + x.title)); process.exit(0); }
console.log('id: ' + g.id + '\ntitle: ' + g.title + '\ntitle_es: ' + g.title_es);
console.log('featured: ' + JSON.stringify(g.featuredProducts));
[].concat(g.featuredProducts).forEach(id => {
  const p = arr.find(y => y.id === id);
  console.log('  ' + id + ' | ' + (p ? p.title : 'FALTA CATALOGO') + ' | $' + (p ? p.price : '?'));
});
console.log('\nsecciones:');
(g.sections || []).forEach((s, i) => console.log(' [' + i + '] ' + (s ? (s.heading || s.h) + ' prods=' + JSON.stringify(s.products) : 'NULA')));
console.log('\nverdictProsCons: ' + g.verdictProsCons.map(v => v.name).join(' | '));
console.log('\ntabla cols (' + g.productTable.columns.length + '):');
g.productTable.columns.forEach((c, i) => console.log('  ' + i + ': ' + c.title));
g.productTable.rows.forEach(r => console.log('  [' + r.label + '] ' + r.values.map(v => v.value).join(' | ')));
console.log('\nVERDICT: ' + g.verdict);
console.log('\nVERDICT_ES: ' + g.verdict_es);
console.log('\nCONCLUSION: ' + g.conclusion);
console.log('\nCONCLUSION_ES: ' + g.conclusion_es);
console.log('\nDESC: ' + g.description);
console.log('\nDESC_ES: ' + g.description_es);
console.log('\nINTRO: ' + g.intro);
console.log('\nINTRO_ES: ' + g.intro_es);
const f = g.featuredSnippet || {};
Object.keys(f).sort().forEach(k => console.log('  ' + k + ': ' + String(f[k]).slice(0, 200)));