fetch('https://r2.gear4music.com/media/119/1197659/1200/preview.jpg', { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'))).catch(e => console.log('foto ERROR: ' + e.message));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json').find(x => x.id === 1006);
console.log('producto: ' + p.brand + ' | ' + p.title + ' | price-field=' + p.price);
console.log('stores: ' + JSON.stringify(p.stores));
const fs = require('fs');
const bg = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = bg.match(/\n1006: [^\n]+/);
console.log('TEST: ' + (m ? m[0] : 'SIN ENTRADA'));
