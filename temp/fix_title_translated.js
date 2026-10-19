const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_title3.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'best-guitar-home-office');

console.log('ANTES:');
console.log('  title:     ' + g.title);
console.log('  title_es:  ' + g.title_es);

// Traduccion fiel del titulo completo:
// "Best Guitars for Remote Work: Silent & Compact (Pros & Cons)"
// -> "Las mejores guitarras para trabajo remoto: silenciosas y compactas (Pros y Contras)"
g.title_es = 'Las mejores guitarras para trabajo remoto: silenciosas y compactas (Pros y Contras)';

console.log('\nDESPUES:');
console.log('  title:     ' + g.title);
console.log('  title_es:  ' + g.title_es);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_title3.json');
console.log('data/guides.json escrito.');