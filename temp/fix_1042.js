const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const p = products.find(x => x.id === 1042);

console.log('antes: ' + Object.keys(p.stores).join(', '));
// Amazon queda fuera: no hay ASIN verificado. Solo Gear4music, cujo link dio el usuario.
delete p.stores.amazon;
fs.writeFileSync(ruta, JSON.stringify(products, null, 2), 'utf8');

console.log('despues: ' + Object.keys(p.stores).join(', '));
console.log('\n=== FICHA 1042 ===');
console.log(JSON.stringify(p, null, 2));

// aviso: ningun enlace de tienda debe ser un.search_query genérico sin producto exacto
const malo = products.filter(x => Object.entries(x.stores || {}).some(([k, v]) => /search_query=|srsltid/i.test(v)));
console.log('\nproductos con enlaces de busqueda generica (revisar): ' + malo.length);
