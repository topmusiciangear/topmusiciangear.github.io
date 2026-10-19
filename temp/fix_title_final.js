const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_title2.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'best-guitar-home-office');
console.log('ANTES:');
console.log('  title:     ' + g.title);
console.log('  title_es:  ' + g.title_es);

g.title_es = g.title;

console.log('\nDESPUES:');
console.log('  title:     ' + g.title);
console.log('  title_es:  ' + g.title_es);
console.log('IGUALES: ' + (g.title === g.title_es));

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_title2.json');
console.log('data/guides.json escrito.');