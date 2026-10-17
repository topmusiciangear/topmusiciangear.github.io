const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const conEs = products.filter(p => (p.desc_es || '').trim()).slice(0, 14);
console.log('productos YA traducidos (referencia de estilo):\n');
conEs.forEach(p => {
  console.log(p.id + ' | ' + p.title + ' | title_es: ' + (p.title_es || '(ninguno)'));
  console.log('  EN: ' + p.desc);
  console.log('  ES: ' + p.desc_es + '\n');
});
// reparto: cuantas hay con title_es
console.log('con title_es: ' + products.filter(p => (p.title_es || '').trim()).length + ' | con desc_es: ' + products.filter(p => (p.desc_es || '').trim()).length);