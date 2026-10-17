const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const p = products.find(x => x.id === 1021);
console.log('1021 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
const m = bg.match(/\n1021: \{prices:\{[^\n]*/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);
console.log('\nPB €251 -> US $' + eur(251) + ' | UK £' + gbp(251));
fetch('https://r2.gear4music.com/media/102/1022509/1200/preview.jpg', { method: 'HEAD' })
  .then(r => console.log('foto G4M: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR ' + e.message));