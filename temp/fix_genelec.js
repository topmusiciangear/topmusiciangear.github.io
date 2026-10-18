const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Buscar el Genelec 8351B por partes del nombre
const genelec = products.find(p => p.title && p.title.includes('Genelec') && p.title.includes('8351'));
if (genelec) {
  console.log('Encontrado: "' + genelec.title + '" con score ' + genelec.score);
  if (genelec.score === undefined || genelec.score < 9.0) {
    genelec.score = 9.6;
    console.log('  -> score actualizado a 9.6');
  }
} else {
  // Listar todos los Genelec
  products.filter(p => p.title && p.title.includes('Genelec')).forEach(p => {
    console.log('  ' + p.title + ': ' + p.score);
  });
}

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Listo');