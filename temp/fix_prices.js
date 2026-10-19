const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

fs.writeFileSync(B + 'temp/products.before_prices.json', JSON.stringify(products, null, 2), 'utf8');

// 1) G&L Tribute L-2000: price 0 es invalido.
//    popsmusic lista "Regular price $899.99" y martinmusic $799.99 en oferta.
//    Se usa 899.99 como lista de catalogo (la mas alta de las dos).
const gl = products.find(p => p.id === 683);
console.log('ANTES  G&L Tribute L-2000  price=' + gl.price);
gl.price = 899.99;
console.log('AHORA  G&L Tribute L-2000  price=' + gl.price);

// 2) Neumann TLM 103: price null.
//    neumann.com dice oficialmente "less than US$ 1.000".
const tlm = products.find(p => p.id === 654);
console.log('ANTES  Neumann TLM 103  price=' + tlm.price);
tlm.price = 999;
console.log('AHORA  Neumann TLM 103  price=' + tlm.price);

// Comprobar que no queda ninguno sin precio
const sinPrecio = products.filter(p => p.price === null || p.price === undefined || p.price === 0);
console.log('\nProductos con price 0/null: ' + sinPrecio.length);
sinPrecio.forEach(p => console.log('   ' + p.title));

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nBackup: temp/products.before_prices.json');
console.log('data/products.json escrito.');
