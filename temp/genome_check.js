const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const p = products.find(x => x.id === 1020);
console.log('1020 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
const m = bg.match(/\n1020: \{prices:\{[^\n]*/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);
console.log('\nPB €131 -> US $' + eur(131) + ' | UK £' + gbp(131));
fetch('https://banners.pluginboutique.com/5g25exhl6gnvjuf00ezqtz9zgjca', { method: 'HEAD' })
  .then(r => console.log('foto PB: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR ' + e.message));