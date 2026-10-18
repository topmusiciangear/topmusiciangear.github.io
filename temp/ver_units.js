const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

console.log('=== UNIDADES EN MONITORES (precio por par o por unidad?) ===');
products.filter(x => x.category === 'monitors').forEach(x => {
  console.log('  ' + String(x.id).padEnd(5) + String(x.title).slice(0, 32).padEnd(33) +
    ('$' + x.price).padEnd(10) + 'unit=' + String(x.unit).padEnd(7) + 'unit_es=' + x.unit_es);
});

console.log('\n=== VALORES DE unit MAS FRECUENTES ===');
const u = {};
products.forEach(x => { u[x.unit || '(null)'] = (u[x.unit || '(null)'] || 0) + 1; });
console.log(JSON.stringify(u, null, 2));
