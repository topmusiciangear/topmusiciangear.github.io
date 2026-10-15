const fs = require('fs');
const GF = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(GF, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const s = guia.sections.find(x => (x.heading_es || '').indexOf('Los tres presupuestos') > -1);
console.log('ANTES EN: ' + s.heading);
console.log('ANTES ES: ' + s.heading_es);

s.heading = 'The Three Budgets: What $605, $925 and $1,393 Buy';
s.heading_es = 'Los tres presupuestos: qué compran $605, $925 y $1.393';

fs.writeFileSync(GF, JSON.stringify(g, null, 2) + '\n', 'utf8');

const g2 = JSON.parse(fs.readFileSync(GF, 'utf8'));
const s2 = g2.find(x => x.id === 'starter-studio').sections
  .find(x => (x.heading_es || '').indexOf('Los tres presupuestos') > -1);
console.log('\nDESPUES EN: ' + s2.heading + '  (' + s2.heading.length + 'c)');
console.log('DESPUES ES: ' + s2.heading_es + '  (' + s2.heading_es.length + 'c)');

// barrido final de toda la guia
const json = JSON.stringify(g2.find(x => x.id === 'starter-studio'));
console.log('\n=== BARRIDO FINAL ===');
['$545', '$816', '$905', '$1.284', 'Under $1,000', 'under $1,000', 'menos de $1.000',
  'five hundred', 'quinientos', 'SM57'].forEach(p => {
  const n = (json.match(new RegExp(p.replace('$', '\\$'), 'g')) || []).length;
  console.log('  ' + (n ? 'RESTA x' + n + '  ' : 'limpio     ') + p);
});
console.log('\n  $1.000 (mencion honesta): ' + (json.match(/\$1\.000/g) || []).length);
console.log('  $1.393: ' + (json.match(/\$1\.393/g) || []).length +
  ' | $605: ' + (json.match(/\$605/g) || []).length +
  ' | $925: ' + (json.match(/\$925/g) || []).length);
