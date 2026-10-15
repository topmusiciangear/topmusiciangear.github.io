// 358 Audio-Technica AT875R: cambiar la foto de Amazon a la de zZounds.
// IMPORTANTE: no se usa la URL tal cual (864x994, vertical). En la tarjeta 4/3 con
// object-fit:cover se recortan 173px arriba y abajo y el micro desaparece entero.
// La variante fit,1200by1200 (mismo hash) es cuadrada y el micro cae en las filas
// 250-430, dentro de la ventana 150-1050 que deja el recorte 4/3.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const HASH = 'at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg';
const NUEVA = 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/' + HASH;

const p = JSON.parse(fs.readFileSync(F, 'utf8'));
const x = p.find(y => y.id === 358);
if (!x) { console.log('NO ENCONTRADO 358'); process.exit(1); }

console.log('ficha : ' + x.title);
console.log('antes : ' + x.img);
x.img = NUEVA;
if ('image' in x) { console.log('image antes: ' + x.image); x.image = NUEVA; }
console.log('despues: ' + x.img);

fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');

const raw = fs.readFileSync(F, 'utf8');
console.log('\n=== CONTROL ===');
console.log('  mojibake                : ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  productos               : ' + JSON.parse(raw).length);
console.log('  quedan img de amazon(358): ' + (JSON.parse(raw).find(y => y.id === 358).img.includes('media-amazon') ? 'SI' : 'no'));
console.log('  358.img                 : ' + JSON.parse(raw).find(y => y.id === 358).img);
