// Verificacion CORRECTA: para cada producto con override, el score guardado en
// products.json debe ser el MAXIMO de todas las guias revisadas donde sale.
// Si no coincide, el producto conserva el score automatico antiguo.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const aliases = require(B + 'temp/name_aliases.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function findProduct(name) {
  if (!name) return null;
  if (aliases[name]) { const a = products.find(p => p.title === aliases[name] || p.title_es === aliases[name]); if (a) return a; }
  const e = products.find(p => p.title === name || p.title_es === name);
  if (e) return e;
  const n = norm(name);
  const c = products.filter(p => norm(p.title).includes(n) || norm(p.title_es || '').includes(n));
  if (c.length === 1) return c[0];
  const r = products.filter(p => n.includes(norm(p.title)) || (p.title_es && n.includes(norm(p.title_es))));
  return r.length === 1 ? r[0] : null;
}

// Recorrer TODOS los overrides y agrupar por id de producto
const porId = {};
for (const [gid, map] of Object.entries(overrides)) {
  Object.entries(map).forEach(([name, score]) => {
    const p = findProduct(name);
    if (!p) return;
    if (!porId[p.id]) porId[p.id] = { title: p.title, guias: [] };
    porId[p.id].guias.push({ gid, name, score });
  });
}

let ok = 0, mal = 0;
const filas = [];
Object.entries(porId).forEach(([id, v]) => {
  const esperado = Math.max(...v.guias.map(g => g.score));
  const prod = products.find(p => p.id === Number(id));
  const real = prod ? prod.score : null;
  if (real === null || Math.abs(real - esperado) > 0.001) {
    mal++;
    filas.push('  ' + v.title.padEnd(46) + ' json=' + String(real).padEnd(5) + ' esperado=' + esperado.toFixed(1) +
      '  guias: ' + v.guias.map(g => g.gid.split('/')[0] + '=' + g.score).join(', '));
  } else ok++;
});

console.log('Productos con override: ' + Object.keys(porId).length);
console.log('  correctos (json = maximo de sus guias): ' + ok);
console.log('  con score antiguo sin aplicar:            ' + mal);
if (filas.length) {
  console.log('\nProductos que conservan el score automatico:');
  filas.slice(0, 70).forEach(f => console.log(f));
}
