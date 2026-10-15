const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'best-32-channel-digital-mixers');

console.log('ANTES:');
console.log('  title:      ' + g.title);
console.log('  titleTag_es:' + g.titleTag_es);

g.title = 'Best 24-32 Channel Digital Mixers';
g.titleTag_es = 'Mejores mezcladoras digitales de 24 a 32 canales';

console.log('\nDESPUES:');
console.log('  title:      ' + g.title + '   [' + g.title.length + ']');
console.log('  titleTag_es:' + g.titleTag_es + '   [' + g.titleTag_es.length + ']');

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');