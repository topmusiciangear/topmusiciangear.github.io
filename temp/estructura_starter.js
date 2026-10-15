const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const nom = id => (p.find(y => y.id === id) || {}).title || ('id ' + id);

console.log('=== featuredProducts (' + guia.featuredProducts.length + ') ===');
guia.featuredProducts.forEach(id => console.log('  ' + String(id).padStart(4) + '  ' + nom(id)));

console.log('\n=== secciones (' + guia.sections.length + ') ===');
guia.sections.forEach((s, i) => {
  console.log('  [' + i + '] ' + (s.heading || '(sin heading)').slice(0, 72));
  console.log('       productos: ' + (s.products || []).map(id => nom(id)).join(' | '));
});

console.log('\n=== veredictos (' + guia.verdictProsCons.length + ') ===');
guia.verdictProsCons.forEach(v => console.log('  ' + (v.name || JSON.stringify(v)).slice(0, 60) + '   (' + (v.pros || []).length + '+' + (v.cons || []).length + ')'));

console.log('\n=== TABLA: filas ===');
guia.productTable.rows.forEach((r, i) => {
  console.log('  [' + i + '] ' + (r.label || r.title || JSON.stringify(Object.keys(r))));
});
console.log('\n  claves de fila: ' + JSON.stringify(Object.keys(guia.productTable.rows[0])));
console.log('  columnas: ' + guia.productTable.columns.map(c => c.title).join(' | '));
