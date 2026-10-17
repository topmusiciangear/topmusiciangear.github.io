const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const malos = products.filter(p => /\((pair|each|2 |set|pack)\)/i.test(p.title || ''));
console.log('titulos con sufijos de unidad: ' + malos.length);
malos.slice(0, 20).forEach(p => console.log('  ' + p.id + ' ' + p.title + ' | unit=' + p.unit));
const conComillas = products.filter(p => /[""]/.test(p.title || ''));
console.log('\ntitulos con comillas: ' + conComillas.length);
conComillas.slice(0, 6).forEach(p => console.log('  ' + p.id + ' ' + p.title));
// longitud extrema (nombres muy largos en un buscador)
const largos = products.map(p => ({ id: p.id, n: (p.title || '').length, t: p.title })).sort((a, b) => b.n - a.n).slice(0, 5);
console.log('\ntitulos mas largos:');
largos.forEach(x => console.log('  ' + x.n + 'c ' + x.id + ' ' + x.t));