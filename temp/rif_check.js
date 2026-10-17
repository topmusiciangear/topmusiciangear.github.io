const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1011);
console.log('1011 ' + (p ? p.brand + ' | ' + p.title + ' | price=' + p.price : 'NO EXISTE'));
if (p) {
  console.log('  img: ' + p.img);
  console.log('  image: ' + p.image);
  console.log('  stores: ' + JSON.stringify(p.stores));
  const dup = products.filter(x => x.brand === p.brand && /riffer/i.test(x.title));
  console.log('  duplicados riffer: ' + dup.map(d => d.id).join(', '));
}
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const m = bg.match(/\n1011: [^\n]+/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
// guias
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.forEach(g => {
  const hit = (g.featuredProducts || []).includes(1011) || (g.sections || []).some(s => (s.products || []).includes(1011));
  if (hit) console.log('  guia: ' + g.id);
});
const g2 = guides.find(x => x.id === 'best-midi-theory-plugins');
console.log('\nguia portada: ' + (g2 ? g2.id + ' | image=' + (g2.image || '(sin valor)') + ' | productos=' + (g2.featuredProducts || []).join(',') : 'NO EXISTE'));
fetch('https://r2.gear4music.com/media/145/1452002/1200/preview.jpg', { method: 'HEAD' })
  .then(r => console.log('\nfoto G4M: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR: ' + e.message));