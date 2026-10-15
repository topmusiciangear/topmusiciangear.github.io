// Unifica el duplicado "Yamaha Montage M8x": id 12 y id 639 son el mismo producto.
// Se conserva el 639 (tienda reverb, descripcion mas completa) y se reorienta
// best-synthesizers y nord-stage-4-vs-montage-m8x al 639.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- 1. guides.json: 12 -> 639 ----
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
let cambios = [];
guides.forEach(g => {
  let n = 0;
  if ((g.featuredProducts || []).indexOf(12) > -1) {
    g.featuredProducts = g.featuredProducts.map(i => i === 12 ? 639 : i); n++;
  }
  (g.sections || []).forEach(s => {
    if ((s.products || []).indexOf(12) > -1) { s.products = s.products.map(i => i === 12 ? 639 : i); n++; }
  });
  if (n) { cambios.push(g.id + ' (' + n + ' referencias)'); fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8'); }
});
console.log('guias reorientadas: ' + (cambios.length ? cambios.join(', ') : 'ninguna'));

// ---- 2. products.json: borrar el 12 ----
const pf = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const i = arr.findIndex(p => p.id === 12);
if (i > -1) {
  const p = arr[i];
  console.log('\nborrando id 12: ' + p.title + ' ($' + p.price + ', ' + Object.keys(p.stores || {}).length + ' tiendas)');
  arr.splice(i, 1);
  fs.writeFileSync(pf, JSON.stringify(P, null, 2), 'utf8');
  console.log('products.json: ' + arr.length + ' productos');
} else console.log('\nid 12 ya no existe en el catalogo');

// ---- 3. build-guides.js: quitar la entrada de precios del 12 ----
const bf = BASE + 'build-guides.js';
let b = fs.readFileSync(bf, 'utf8');
const re = /\n\s*12:\s*\{\s*\n\s*prices:\s*\{[\s\S]*?\n\s*\}\s*,\s*\n\s*\},\n/;
if (re.test(b)) {
  b = b.replace(re, '\n');
  fs.writeFileSync(bf, b, 'utf8');
  console.log('build-guides.js: entrada TEST_SHOP_BTN del 12 eliminada');
} else console.log('\n!! no encontre la entrada TEST_SHOP_BTN del 12');

// ---- 4. verificacion ----
console.log('\n--- verificacion ---');
const G2 = JSON.parse(fs.readFileSync(gf, 'utf8'));
const P2 = JSON.parse(fs.readFileSync(pf, 'utf8'));
const A2 = Array.isArray(P2) ? P2 : P2.products;
const titulos = new Set(A2.map(p => p.title));
const rep = [];
A2.forEach(p => { (rep[p.title] = rep[p.title] || []).push(p.id); });
const dups = Object.entries(rep).filter(([, v]) => v.length > 1);
console.log('titulos duplicados en el catalogo: ' + dups.length + (dups.length ? ' -> ' + dups.map(d => d[0] + ' [' + d[1].join(',') + ']').join(' ; ') : ''));
let huerfanos = 0;
G2.forEach(g => {
  const ids = [].concat(g.featuredProducts || []).concat(...(g.sections || []).map(s => s.products || []));
  [...new Set(ids)].forEach(id => { if (!A2.find(p => p.id === id)) { huerfanos++; console.log('   !! ' + g.id + ' apunta al id ' + id + ' que ya no existe'); } });
});
console.log('referencias a productos inexistentes: ' + huerfanos);
const mont = A2.filter(p => /montage m8x/i.test(p.title));
console.log('Montage M8x en el catalogo: ' + mont.length + ' -> id ' + mont.map(p => p.id).join(',') + ' ($' + mont[0].price + ', ' + Object.keys(mont[0].stores || {}).length + ' tiendas)');