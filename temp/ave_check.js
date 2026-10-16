fetch('https://banners.pluginboutique.com/ap79glkmzpg1fsfxjzf8jl0bx2f4', { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'))).catch(e => console.log('foto ERROR: ' + e.message));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json').find(x => x.id === 1004);
console.log('producto: ' + p.brand + ' | ' + p.title + ' | price-field=' + p.price);
console.log('stores: ' + JSON.stringify(p.stores));
const fs = require('fs');
const bg = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = bg.match(/\n1004: [^\n]+/);
console.log('TEST: ' + (m ? m[0] : 'SIN ENTRADA'));
