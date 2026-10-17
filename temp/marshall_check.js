const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const p = products.find(x => x.id === 1023);
console.log('1023 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + JSON.stringify(p.stores));
const m = bg.match(/\n1023: \{prices:\{[^\n]*/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
fetch('https://banners.pluginboutique.com/jw9d7a7qkh6x0oas55mvpwqt7d16', { method: 'HEAD' })
  .then(r => console.log('\nfoto PB: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR ' + e.message));