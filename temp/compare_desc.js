const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

['best-amp-modelers', 'wireless-lapel-mics', 'stage-mics'].forEach(function (id) {
  const g = guides.find(x => x.id === id);
  const h = fs.readFileSync(BASE + 'guides/' + id + '.html', 'utf8');
  const rendered = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  console.log('=== ' + id + ' ===');
  console.log('  guides.json [' + (g.description || '').length + ']: ' + JSON.stringify(g.description));
  console.log('  HTML        [' + rendered.length + ']: ' + JSON.stringify(rendered));
  console.log('  iguales: ' + (rendered === g.description));
  console.log('');
});

console.log('=== como genera el build la meta description ===');
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const idx = b.indexOf('name="description"');
console.log(b.substring(Math.max(0, idx - 420), idx + 260));