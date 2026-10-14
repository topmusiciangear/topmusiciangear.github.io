const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

// featured = productos con review propia (invariante dura del sitio)
let changed = [], dropped = [];
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  if (!solo.length) return;
  const keep = feat.filter(id => solo.includes(id));
  // + reviews que no estaban en featured pero existen en la guia (ganancia real)
  solo.forEach(id => { if (keep.indexOf(id) === -1) keep.push(id); });
  if (keep.length === feat.length && feat.every((v, i) => v === keep[i])) return;
  feat.filter(id => !keep.includes(id)).forEach(id => dropped.push(g.id + ' ' + id + ' ' + byId[id].title));
  g.featuredProducts = keep;
  changed.push(g.id + ': ' + feat.length + ' -> ' + keep.length);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('guias ajustadas: ' + changed.length);
console.log('\nproductos que salen de "destacados" (siguen en tabla y veredicto, pero sin ficha propia):\n');
dropped.forEach(d => console.log('  - ' + d));
// verificacion de la invariante
let bad = 0;
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const miss = feat.filter(id => !solo.includes(id));
  if (miss.length) { bad++; console.log('FALLO ' + g.id + ': ' + miss.join(',')); }
});
console.log('\ndestacados sin review: ' + bad + ' guias');