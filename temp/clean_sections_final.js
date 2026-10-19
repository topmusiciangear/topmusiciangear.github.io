// Limpia fix-clipping-scarlett: deja solo las secciones instructivas puras (0-5).
// Elimina las secciones 6-10 que son textos de otros productos.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_clean5.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'fix-clipping-scarlett');

// Mantener solo las primeras 6 secciones (0-5): puramente instructivas sobre Scarlett 2i2
g.sections = g.sections.slice(0, 6);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Secciones restantes: ' + g.sections.length);
g.sections.forEach((s, i) => console.log('  ' + i + '. ' + s.heading));
console.log('Backup: temp/guides.before_clean5.json');
console.log('data/guides.json escrito.');