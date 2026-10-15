const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const NUEVA = 'https://m.media-amazon.com/images/I/61MX8mAxVfL._AC_SY879_.jpg';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));
const x = p.find(y => y.id === 270);
if (!x) { console.log('NO EXISTE 270'); process.exit(1); }
console.log('ficha : ' + x.title);
console.log('antes : ' + x.img);
x.img = NUEVA;
if ('image' in x) x.image = NUEVA;
console.log('despues: ' + x.img);
fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');
const raw = fs.readFileSync(F, 'utf8');
console.log('mojibake: ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length + '  productos: ' + JSON.parse(raw).length);
