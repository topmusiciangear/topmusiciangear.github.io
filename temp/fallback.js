const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const normName = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const titulos = {};
arr.forEach(p => { const t = normName(p.title); (titulos[t] = titulos[t] || []).push(p.id); });
const ambiguos = Object.entries(titulos).filter(([, v]) => v.length > 1);
console.log('titulos ambiguos en el catalogo: ' + ambiguos.length);
ambiguos.forEach(([t, v]) => console.log('   "' + t + '" -> ids ' + v.join(', ')));

// cuantas guias dependen del fallback por nombre
let soloNombre = 0; const detalle = [];
guides.forEach(g => {
  const ids = new Set();
  (g.featuredProducts || []).forEach(i => ids.add(i));
  (g.products || []).forEach(i => ids.add(i));
  (g.sections || []).forEach(s => (s.products || []).forEach(i => ids.add(i)));
  const names = [];
  if (g.productTable) g.productTable.columns.forEach(c => { if (c.title) names.push(c.title); if (c.title_es) names.push(c.title_es); });
  (g.verdictProsCons || []).forEach(v => { if (v.name) names.push(v.name); if (v.name_es) names.push(v.name_es); });
  const porNombre = new Set();
  names.forEach(n => {
    const t = normName(n);
    if (!t || t.length < 4) return;
    arr.filter(p => normName(p.title) === t || (p.title_es && normName(p.title_es) === t))
       .forEach(p => { if (!ids.has(p.id)) porNombre.add(p.id); });
  });
  if (porNombre.size) { soloNombre++; detalle.push(g.id + ' -> ' + porNombre.size + ' productos solo por nombre'); }
});
console.log('\nguias que perderian chips si se quita el fallback: ' + soloNombre);
detalle.slice(0, 25).forEach(d => console.log('   ' + d));

// app.min.js tiene la misma funcion?
const min = fs.readFileSync(BASE + 'js/app.min.js', 'utf8');
console.log('\n=== app.min.js ===');
console.log('  contiene findProductGuides: ' + /findProductGuides/.test(min));
console.log('  contiene el fallback por nombre (productTable): ' + /productTable/.test(min));
const m = min.match(/function findProductGuides[\s\S]{0,1200}/);
if (m) console.log('\n  --- copia en el min ---\n' + m[0].slice(0, 1100));