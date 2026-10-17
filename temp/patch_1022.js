const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const FOTO = 'https://banners.pluginboutique.com/u5zmzsa7enh2qle445s66qd3sumn';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1022);
if (!p) { console.log('1022 no existe'); process.exit(1); }
p.img = FOTO; p.image = FOTO;
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1022 img=' + p.img);
console.log('  antes image=' + p.image.replace(FOTO, '(nueva)'));
console.log('  precio PB sin cambios: \u20AC70.58 (no diste uno nuevo)');