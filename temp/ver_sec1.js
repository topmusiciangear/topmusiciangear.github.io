const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('=== seccion [1] · los tres presupuestos ===');
s.sections[1].content.split('</p><p>').forEach((x, i) =>
  console.log('\n  EN[' + i + ']: ' + x.replace(/<[^>]+>/g, '').trim()));
console.log('\n\n=== ES ===');
s.sections[1].content_es.split('</p><p>').forEach((x, i) =>
  console.log('\n  ES[' + i + ']: ' + x.replace(/<[^>]+>/g, '').trim()));

console.log('\n\n=== seccion [6] · 1er parrafo ===');
console.log('  EN: ' + s.sections[6].content.split('</p>')[0].replace(/<[^>]+>/g, '').trim());
console.log('\n  ES: ' + s.sections[6].content_es.split('</p>')[0].replace(/<[^>]+>/g, '').trim());
