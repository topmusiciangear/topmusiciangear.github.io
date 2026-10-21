const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');

console.log('title:', g.title);
console.log('title_es:', g.title_es);
console.log('description:', (g.description || '').slice(0, 200));
console.log('description_es:', (g.description_es || '').slice(0, 200));
console.log('badge:', g.badge);

console.log('\n=== SECCIONES (' + g.sections.length + ') ===');
g.sections.forEach((s, i) => {
  console.log('\n[' + i + '] ' + s.heading);
  console.log('    ES: ' + s.heading_es);
  console.log('    products: ' + JSON.stringify(s.products));
  console.log('    content chars: ' + (s.content || '').length + ' | veredicto: ' + ((s.verdict || '').slice(0, 80)));
  console.log('    pros: ' + JSON.stringify((s.pros || []).slice(0, 1)) + ' ... cons: ' + JSON.stringify((s.cons || []).slice(0, 1)));
  console.log('    specs: ' + JSON.stringify(s.specs).slice(0, 120));
});

console.log('\n=== TABLE ===');
g.productTable.columns.forEach((c, i) => console.log(i + ': ' + c.title + ' || ' + c.title_es));
g.productTable.rows.forEach(r => console.log('  ROW ' + r.label + ' -> ' + JSON.stringify(r.values).slice(0, 200)));

console.log('\n=== VERDICT PROS CONS ===');
g.verdictProsCons.forEach(v => console.log(v.name + ' | pros ' + v.pros.length + ' | cons ' + v.cons.length));

console.log('\n=== CONCLUSION (primeros 600) ===');
console.log((g.conclusion || '').slice(0, 600));
console.log('\n=== VERDICT (primeros 800) ===');
console.log((g.verdict || '').slice(0, 800));
