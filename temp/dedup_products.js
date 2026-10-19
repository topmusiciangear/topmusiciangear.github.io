const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

fs.writeFileSync(B + 'temp/products.before_dedup.json', JSON.stringify(products, null, 2), 'utf8');

const antes = products.length;
const limpio = products.filter(p => p.id !== 241);

const kept = limpio.filter(p => p.title === 'RØDE RØDECaster Pro II');
console.log('Productos: ' + antes + ' -> ' + limpio.length);
console.log('Entradas de RØDECaster Pro II restantes: ' + kept.length);
kept.forEach(p => {
  console.log('  id=' + p.id + ' score=' + p.score + ' tiendas=' + Object.keys(p.stores || {}).length);
});
console.log('Duplicados por titulo: ' + (limpio.length - new Set(limpio.map(p => p.title)).size));

fs.writeFileSync(B + 'data/products.json', JSON.stringify(limpio, null, 2), 'utf8');
console.log('Backup: temp/products.before_dedup.json');
