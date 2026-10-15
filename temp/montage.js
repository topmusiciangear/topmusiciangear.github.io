const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

// quien usa el 12 y quien usa el 639, en TODO el corpus
[12, 639].forEach(id => {
  console.log('\n=== DONDE SE USA EL id ' + id + ' ===');
  guides.forEach(g => {
    const hits = [];
    if ((g.featuredProducts || []).indexOf(id) > -1) hits.push('featuredProducts');
    (g.sections || []).forEach((s, i) => { if ((s.products || []).indexOf(id) > -1) hits.push('seccion ' + i + ' (' + (s.heading || s.h || '?').slice(0, 46) + ')'); });
    if (hits.length) console.log('  ' + g.id.padEnd(28) + ' -> ' + hits.join(' | '));
  });
  const raw = JSON.stringify(guides);
  const n = (raw.match(new RegExp('"' + id + '"', 'g')) || []).length;
  console.log('  apariciones del numero en guides.json: ' + n);
});

console.log('\n=== FICHA DE CADA UNO ===');
[12, 639].forEach(id => {
  const p = arr.find(x => x.id === id);
  console.log('\nid ' + id + ': ' + p.title);
  console.log('  precio $' + p.price + ' | cat ' + p.category + ' | img ' + p.img);
  console.log('  tiendas: ' + Object.keys(p.stores || {}).join(', '));
  console.log('  desc: ' + String(p.desc || '').slice(0, 160));
  console.log('  desc_es: ' + String(p.desc_es || '').slice(0, 160));
});

// el buscador de la home: de donde saca los productos
console.log('\n=== DE DONDE SACA PRODUCTOS EL BUSCADOR DE LA HOME ===');
const app = fs.readFileSync(BASE + 'js/app.js', 'utf8');
['products.json','__PRODUCTS__','PRODUCTS','renderProductCard','searchProducts'].forEach(k => {
  const i = app.indexOf(k);
  console.log('  ' + k.padEnd(20) + (i > -1 ? ' encontrada en el indice ' + i : ' NO aparece en js/app.js'));
});