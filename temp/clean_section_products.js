// Limpia los arrays 'products' de todas las secciones en fix-clipping-scarlett.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_clean4.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'fix-clipping-scarlett');
if (g.sections) {
  g.sections.forEach(s => {
    s.products = [];
  });
}

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('sections limpiadas: ' + g.sections.length);
console.log('Backup: temp/guides.before_clean4.json');
console.log('data/guides.json escrito.');