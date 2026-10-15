const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const isHub = (g) => /-vs-/.test(g.id) || /^pro-/.test(g.id);
const bucket = { hub: 0, listicle: 0 };
const list = [];
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const vp = (g.verdictProsCons || []).map(v => v.name);
  const enVp = arr.filter(p => vp.some(n => n === p.title || p.title.indexOf(n) === 0 || n.indexOf(p.title) === 0));
  const miss = enVp.filter(p => !solo.includes(p.id));
  if (!miss.length) return;
  if (isHub(g)) { bucket.hub += miss.length; return; }
  bucket.listicle += miss.length;
  list.push({ id: g.id, n: miss.length, miss: miss.map(p => p.id + ' ' + p.title) });
});
list.sort((a, b) => b.n - a.n);
console.log('Productos en veredictos/tabla SIN review propia:');
console.log('  en guias comparativas/hub (X vs Y, pro-*): ' + bucket.hub + '  -> no necesitan ficha, son filas de tabla');
console.log('  en guias de listado (listicle): ' + bucket.listicle + ' en ' + list.length + ' guias\n');
list.forEach(r => console.log('  ' + String(r.n).padStart(2) + '  ' + r.id + '\n      ' + r.miss.join('\n      ')));
console.log('\n--- invariante real del sitio ---');
let bad = 0;
guides.forEach(g => {
  if (isHub(g)) return;
  const feat = [].concat(g.featuredProducts || []);
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const miss = feat.filter(id => !solo.includes(id));
  if (miss.length) { bad++; console.log('FALLA ' + g.id + ': ' + miss.join(',')); }
});
console.log('guias no-hub con destacados sin review: ' + bad);