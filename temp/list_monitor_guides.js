const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const mons = gs.filter(g => g.category === 'monitors');
console.log('TOTAL monitors guides:', mons.length);
mons.forEach(g => {
  const secs = (g.sections || []).length;
  console.log('- ' + g.id);
  console.log('    EN: ' + g.title + '  [' + (g.title || '').length + ']');
  console.log('    ES: ' + (g.title_es || '') + '  [' + (g.title_es || '').length + ']');
  console.log('    desc: ' + (g.description || '').slice(0, 150));
  console.log('    secciones: ' + secs + ' | productos: ' + JSON.stringify(g.featuredProducts || []));
});
