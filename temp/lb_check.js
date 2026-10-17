const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const p = products.find(x => x.id === 1022);
console.log('1022 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
const m = bg.match(/\n1022: \{prices:\{[^\n]*/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
fetch('https://banners.pluginboutique.com/u5zmzsa7enh2qle445s66qd3sumn', { method: 'HEAD' })
  .then(r => console.log('\nfoto PB: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR ' + e.message));