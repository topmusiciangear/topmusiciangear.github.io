// 675 sE Electronics X1 R: la imagen del fabricante devuelve un reto de Cloudflare (202 text/html)
// -> se pasa al CDN de Gear4Music, igual que los otros sE del catalogo
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const NUEVA = 'https://r2.gear4music.com/media/26/260432/1200/preview_1.jpg';

const p = JSON.parse(fs.readFileSync(F, 'utf8'));
const x = p.find(y => y.id === 675);
if (!x) { console.log('NO ENCONTRADO 675'); process.exit(1); }

console.log('ANTES  img: ' + x.img);
console.log('ANTES image: ' + x.image);
x.img = NUEVA;
x.image = NUEVA;
console.log('DESPUES img: ' + x.img);
console.log('DESPUES image: ' + x.image);

fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');

const raw = fs.readFileSync(F, 'utf8');
console.log('\nmojibake: ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('productos: ' + JSON.parse(raw).length);
const y = JSON.parse(raw).find(z => z.id === 675);
console.log('verificacion 675.img: ' + y.img);
console.log('quedan URLs de seelectronics.com: ' + (raw.match(/seelectronics\.com\/wp-content/g) || []).length);
