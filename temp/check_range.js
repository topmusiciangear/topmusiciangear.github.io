const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bad = products.filter(p => typeof p.score !== 'number' || p.score < 8.7 || p.score > 9.8);
console.log('Productos fuera de rango 8.7-9.8: ' + bad.length + ' de ' + products.length);
bad.slice(0, 30).forEach(p => console.log('  ' + p.score + '  ' + p.title));
