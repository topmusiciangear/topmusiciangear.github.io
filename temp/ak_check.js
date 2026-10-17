const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1016);
console.log('1016 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  stores: ' + JSON.stringify(p.stores, null, 1));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const m = bg.match(/\n1016: [^\n]+/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
// duplicados por marca+titulo
const dup = products.filter(x => x.brand === p.brand && x.title === p.title);
console.log('  duplicados exactos: ' + dup.map(d => d.id).join(', '));
// donde aparece
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.forEach(g => {
  if ((g.featuredProducts || []).includes(1016)) console.log('  guia: ' + g.id + ' [featured]');
  (g.sections || []).forEach(s => { if ((s.products || []).includes(1016)) console.log('  guia: ' + g.id + ' [section ' + (s.heading || '').slice(0, 28) + ']'); });
});
// verificar imagen
fetch('https://r2.gear4music.com/media/68/687753/1200/preview.jpg', { method: 'HEAD' })
  .then(r => console.log('\n  foto G4M: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('  foto ERROR: ' + e.message));