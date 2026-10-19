const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

console.log('Productos totales: ' + products.length);
console.log('Con id 241 (no debe existir): ' + products.filter(p => p.id === 241).length);
console.log('Duplicados por titulo: ' + (products.length - new Set(products.map(p => p.title)).size));

const kept = products.filter(p => p.title === 'RØDE RØDECaster Pro II');
console.log('\nEntradas de RØDECaster Pro II: ' + kept.length);
kept.forEach(p => {
  console.log('  id=' + p.id + ' score=' + p.score + ' tiendas=' + Object.keys(p.stores || {}).join(','));
  console.log('  desc_es (' + p.desc_es.length + '): ' + p.desc_es);
  console.log('  img: ' + p.img);
});

const sinScore = products.filter(p => typeof p.score !== 'number');
console.log('\nProductos sin score: ' + sinScore.length);
const fuera = products.filter(p => p.score < 8.7 || p.score > 9.8);
console.log('Productos fuera de rango 8.7-9.8: ' + fuera.length);
