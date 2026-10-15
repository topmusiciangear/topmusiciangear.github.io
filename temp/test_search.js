const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const a = fs.readFileSync(BASE + 'js/app.js', 'utf8');
const m = fs.readFileSync(BASE + 'js/app.min.js', 'utf8');
try { new Function(a); console.log('app.js    compila OK'); } catch (e) { console.log('app.js ERROR ' + e.message); }
try { new Function(m); console.log('app.min.js compila OK'); } catch (e) { console.log('app.min.js ERROR ' + e.message); }

console.log('\napp.js    usa productTable dentro de findProductGuides: ' +
  /function findProductGuides[\s\S]*?productTable[\s\S]*?return out/.test(a));
console.log('app.min.js usa productTable dentro de findProductGuides: ' +
  /function findProductGuides[\s\S]*?productTable[\s\S]*?return/.test(m));

// ---- simular el buscador con los datos reales ----
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const products = Array.isArray(P) ? P : P.products;

function findProductGuides(productId, currentLang) {
  const isEs = currentLang === 'es';
  const out = []; const seen = {};
  function pushGuide(g) { if (seen[g.id]) return; seen[g.id] = true; out.push({ id: g.id, name: isEs && g.title_es ? g.title_es : (g.title || g.id) }); }
  (guides || []).forEach(function(g) {
    var ids = [];
    if (g.featuredProducts) ids = ids.concat(g.featuredProducts);
    if (g.products) ids = ids.concat(g.products);
    if (g.sections) g.sections.forEach(function(s) { if (s.products) ids = ids.concat(s.products); });
    if (ids.indexOf(productId) !== -1) { pushGuide(g); }
  });
  return out;
}

console.log('\n=== "Find in guide" ahora (EN) ===');
[536, 200, 639, 300].forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log('  id ' + id + ': no existe'); return; }
  const gl = findProductGuides(id, 'en');
  console.log('  ' + p.title);
  console.log('     -> ' + (gl.length ? gl.map(g => g.name).join('  |  ') : '(sin guias)'));
});

console.log('\n=== ESP: ===');
[536].forEach(id => {
  const gl = findProductGuides(id, 'es');
  console.log('  id ' + id + ' -> ' + gl.map(g => g.name).join('  |  '));
});

// ¿queda algun producto con 2+ fichas de nombre igual? (debe ser 0)
const rep = {}; products.forEach(p => { (rep[p.title] = rep[p.title] || []).push(p.id); });
const dups = Object.entries(rep).filter(([, v]) => v.length > 1);
console.log('\ntitulos duplicados en el catalogo: ' + dups.length);