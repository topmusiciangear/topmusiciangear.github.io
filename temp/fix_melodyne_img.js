const fs = require('fs');
// Melodyne: el campo "image" apunta a una URL muerta de celemony.com (404) y no se
// usa en ningun render; lo igualamos a la foto local del producto (misma que "img").
const dead = 'https://www.celemony.com/images/products/melodyne-5/melodyne-5.jpg';
const local = 'img/products/867c69d22f.webp';
let s = fs.readFileSync('data/products.json', 'utf8');
const n = s.split(dead).length - 1;
s = s.split(dead).join(local);
fs.writeFileSync('data/products.json', s, 'utf8');
console.log('sustituciones melodyne:', n);
