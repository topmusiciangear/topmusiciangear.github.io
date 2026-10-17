const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1017);
console.log('1017 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + JSON.stringify(p.stores));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const m = bg.match(/\n1017: [^\n]+/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
const dup = products.filter(x => x.brand === p.brand && x.title === p.title);
console.log('  duplicados: ' + dup.map(d => d.id).join(', '));
fetch('https://banners.pluginboutique.com/oq40l98skd6uogdulc20z92udwkh', { method: 'HEAD' })
  .then(r => console.log('\n  foto PB: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('  foto ERROR: ' + e.message));