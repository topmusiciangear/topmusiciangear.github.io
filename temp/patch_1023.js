const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const FOTO = 'https://banners.pluginboutique.com/jw9d7a7qkh6x0oas55mvpwqt7d16';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1023);
if (!p) { console.log('1023 no existe'); process.exit(1); }
p.img = FOTO; p.image = FOTO;
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1023 img=' + p.img);
console.log('  precio PB sin cambios: \u20AC150.25 (no diste uno nuevo)');
console.log('  stores: ' + Object.keys(p.stores).join(', '));