const fs = require('fs');
const list = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const other = list.filter(p => !/^https?:/.test(p.img || '') && !/^img\/products\//.test(p.img || ''));
console.log('productos con img fuera de img/products:', other.length);
for (const p of other) console.log(p.id, '|', p.title, '|', p.img, '| existe:', fs.existsSync(p.img || ''));
