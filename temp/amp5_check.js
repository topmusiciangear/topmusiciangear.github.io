const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const p = products.find(x => x.id === 1019);
console.log('=== 1019 ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
console.log('  img: ' + p.img);
console.log('  image: ' + p.image);
console.log('  desc: ' + p.desc);
console.log('  desc_es: ' + p.desc_es);
console.log('  stores: ' + JSON.stringify(p.stores, null, 1));
const m = bg.match(/\n1019: \{prices:\{[^\n]*/);
console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));

const g = guides.find(x => x.id === 'best-guitar-plugins');
console.log('\n=== guia best-guitar-plugins | image=' + (g.image || '(sin valor)'));
console.log('  featuredProducts: ' + (g.featuredProducts || []).join(', '));
console.log('\n  secciones con 1019:');
(g.sections || []).forEach((s, i) => { if ((s.products || []).includes(1019)) console.log('   [' + i + '] ' + s.heading + ' | heading_es: ' + s.heading_es); });
console.log('\n  productTable:');
const pt = g.productTable;
if (pt) {
  console.log('   headers: ' + JSON.stringify(pt.headers || pt.head || []));
  (pt.rows || []).forEach((r, i) => { if (JSON.stringify(r).includes('AmpliTube')) console.log('   fila ' + i + ': ' + JSON.stringify(r)); });
}
console.log('\n  verdictProsCons con AmpliTube:');
(g.verdictProsCons || []).forEach((v, i) => { if (/AmpliTube/i.test(v.name + ' ' + (v.name_es || ''))) console.log('   [' + i + '] ' + JSON.stringify(v, null, 1)); });
// prosa que cite 400 modelos
const hits = [];
guides.forEach(x => { const s = JSON.stringify(x); if (/400\+|400 modelos/.test(s)) hits.push(x.id); });
console.log('\nguias que citan "400+" modelos: ' + hits.join(', '));
fetch('https://r2.gear4music.com/media/71/711975/1200/preview.jpg', { method: 'HEAD' })
  .then(r => console.log('\nfoto G4M: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('foto ERROR ' + e.message));