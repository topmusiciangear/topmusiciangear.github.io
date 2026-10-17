const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1018);
console.log('1018 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + JSON.stringify(p.stores, null, 1));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const m = bg.match(/\n1018: [^\n]+/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
const dup = products.filter(x => x.brand === p.brand && x.title === p.title);
console.log('  duplicados: ' + dup.map(d => d.id).join(', '));
Promise.all([
  fetch('https://r2.gear4music.com/media/91/914093/1200/preview.jpg', { method: 'HEAD' }).then(r => 'foto G4M: ' + r.status + ' | ' + r.headers.get('content-type')).catch(e => 'foto ERROR ' + e.message),
  fetch('https://www.andertons.co.uk/arturia-augmented-grand-piano/', { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(r => 'andertons: ' + r.status).catch(e => 'andertons ERROR ' + e.message)
]).then(r => r.forEach(x => console.log('  ' + x)));