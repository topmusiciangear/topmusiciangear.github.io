// Aplica temp/score_overrides.js a data/products.json y reporta el progreso
// guia por guia. NO asigna scores automaticos: solo aplica lo que se ha
// revisado a mano y muestra lo que falta.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const aliases = require(B + 'temp/name_aliases.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]/g, '');

function findProduct(name) {
  if (!name) return null;
  if (aliases[name]) {
    const a = products.find(p => p.title === aliases[name] || p.title_es === aliases[name]);
    if (a) return a;
  }
  const exact = products.find(p => p.title === name || p.title_es === name);
  if (exact) return exact;
  const n = norm(name);
  if (!n) return null;
  const cont = products.filter(p => norm(p.title).includes(n) || norm(p.title_es || '').includes(n));
  if (cont.length === 1) return cont[0];
  const rev = products.filter(p => n.includes(norm(p.title)) || (p.title_es && n.includes(norm(p.title_es))));
  return rev.length === 1 ? rev[0] : null;
}

let applied = 0;
const problems = [];
const escribio = [];
for (const [guideId, map] of Object.entries(overrides)) {
  for (const [name, score] of Object.entries(map)) {
    const p = findProduct(name);
    if (!p) { problems.push(guideId + ' -> "' + name + '" NO existe en products.json'); continue; }
    if (score < 8.7 || score > 9.8) { problems.push(guideId + ' -> ' + name + ' (' + score + ') fuera de rango 8.7-9.8'); continue; }
    p.score = score;
    escribio.push({ id: p.id, title: p.title, score });
    applied++;
  }
}

// Comprobacion de colisiones entre guias. Un producto puntuado en varias guias
// recibe UNA sola nota. Gana la guia donde el producto ocupa el puesto mas
// alto de su propio veredicto (indice menor en la lista de la guia): si en una
// guia es el flagship y en otra es una alternativa, manda la primera.
const porProducto = {};
escribio.forEach((e, i) => {
  const orden = Object.keys(overrides);
  const guiasDelProducto = orden.filter(gid => {
    const map = overrides[gid];
    return Object.keys(map).some(n => { const q = findProduct(n); return q && q.id === e.id; });
  });
  e.guias = guiasDelProducto;
  e.rank = Math.min(...guiasDelProducto.map(gid =>
    Object.keys(overrides[gid]).indexOf(
      Object.keys(overrides[gid]).find(n => { const q = findProduct(n); return q && q.id === e.id; })
    )
  ));
  if (!porProducto[e.id] || e.rank < porProducto[e.id].rank) porProducto[e.id] = e;
});

const colisiones = Object.values(porProducto).filter(e => e.guias.length > 1);
if (colisiones.length) {
  console.log('Productos en mas de una guia (gana donde tiene el puesto mas alto): ' + colisiones.length);
  colisiones.forEach(c => {
    console.log('   id=' + c.id + ' "' + c.title + '"');
    console.log('      ' + c.guias.map((g, i) => g + '=' + c.score + '@pos' + c.rank).join('  ') +
      '  -> ' + c.score);
  });
  // Reaplicar en orden de rank: al final gana el de mejor posicion
  const ordenadas = [...Object.values(porProducto)].sort((a, b) => b.rank - a.rank);
  ordenadas.forEach(e => { const prod = products.find(p => p.id === e.id); if (prod) prod.score = e.score; });
}

const reviewed = new Set(Object.keys(overrides));
const pending = [];
for (const g of guides) {
  const all = new Set();
  (g.verdictProsCons || []).forEach(v => { if (v.name) all.add(v.name); });
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => { const n = c.title_es || c.title; if (n) all.add(n); });
  }
  if (!all.size) continue;
  pending.push({ id: g.id, title: g.title, n: all.size, done: reviewed.has(g.id) });
}
const done = pending.filter(p => p.done);
const todo = pending.filter(p => !p.done).sort((a, b) => b.n - a.n);

console.log('Overrides aplicados: ' + applied);
if (problems.length) { console.log('\nPROBLEMAS:'); problems.forEach(m => console.log('  ' + m)); }
console.log('\nGuias revisadas: ' + done.length + '/' + pending.length);
console.log('Guias pendientes: ' + todo.length);
console.log('Productos-slot pendientes: ' + todo.reduce((a, b) => a + b.n, 0));

console.log('\n--- REVISADAS (score por guia) ---');
done.forEach(p => {
  console.log('\n' + p.id);
  Object.entries(overrides[p.id]).sort((a, b) => b[1] - a[1])
    .forEach(([n, s]) => console.log('   ' + s.toFixed(1) + '  ' + n));
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\ndata/products.json escrito.');
