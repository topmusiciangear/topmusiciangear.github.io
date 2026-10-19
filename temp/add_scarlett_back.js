// Añade la Scarlett 2i2 de vuelta a fix-clipping-scarlett como producto principal.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_scarlett.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'fix-clipping-scarlett');
const scarlett = products.find(p => (p.title || '').includes('Scarlett 2i2 4th Gen'));

if (!scarlett) {
  console.log('ERROR: Scarlett 2i2 no encontrada en products.json');
  process.exit(1);
}

console.log('Scarlett encontrada: id=' + scarlett.id + ' title=' + scarlett.title);

// Añadir a featuredProducts para que aparezca como producto principal
g.featuredProducts = [scarlett.id];

// También asegurarse de que esté en la primera sección para que tenga foto/texto
if (g.sections && g.sections.length > 0) {
  g.sections[0].products = [scarlett.id];
}

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_scarlett.json');
console.log('data/guides.json escrito.');
console.log('featuredProducts:', g.featuredProducts);
console.log('section[0].products:', g.sections[0].products);