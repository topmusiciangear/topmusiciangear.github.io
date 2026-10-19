// Aplica temp/score_overrides.js a data/products.json.
//
// REGLA UNICA: cada producto tiene UN SOLO score. Si aparece en varias guias,
// gana la nota mas alta, es decir la guia donde el veredicto o la conclusion lo
// coloca mas arriba (flagship). Asi no hay scores repetidos ni contradictorios.
//
// NO asigna scores automaticos: solo aplica lo revisado a mano y reporta el
// progreso guia por guia.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const aliases = require(B + 'temp/name_aliases.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
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

// 1) Recoger todas las puntuaciones por producto id
const porId = {};
const problems = [];
for (const [gid, map] of Object.entries(overrides)) {
  Object.entries(map).forEach(([name, score], pos) => {
    const p = findProduct(name);
    if (!p) { problems.push(gid + ' -> "' + name + '" no existe en products.json'); return; }
    if (score < 8.7 || score > 9.8) { problems.push(gid + ' -> ' + name + ' (' + score + ') fuera de 8.7-9.8'); return; }
    if (!porId[p.id]) porId[p.id] = { id: p.id, title: p.title, guias: [] };
    porId[p.id].guias.push({ gid, score, pos });
  });
}

// 2) Resolver: un score por producto = el mas alto (guia donde es flagship).
//    Empate -> el que ocupa el puesto mas alto en su guia (pos menor).
const resueltos = Object.values(porId).map(v => {
  const max = Math.max(...v.guias.map(g => g.score));
  const candidatos = v.guias.filter(g => g.score === max);
  const ganador = candidatos.reduce((a, b) => (b.pos < a.pos ? b : a));
  return { ...v, score: ganador.score, gana: ganador, alternativas: v.guias.filter(g => g !== ganador) };
});

const conChoque = resueltos.filter(v => v.alternativas.length);

// 3) Escribir UN score por producto
let cambiados = 0;
resueltos.forEach(r => {
  const prod = products.find(p => p.id === r.id);
  if (!prod) return;
  if (prod.score !== r.score) cambiados++;
  prod.score = r.score;
});
console.log('Scores efectivamente cambiados en este paso: ' + cambiados + ' de ' + resueltos.length);

// 4) Informe
const reviewed = new Set(Object.keys(overrides));
const pending = [];
for (const g of guides) {
  const all = new Set();
  (g.verdictProsCons || []).forEach(v => { if (v.name) all.add(v.name); });
  if (g.productTable && g.productTable.columns) g.productTable.columns.forEach(c => { const n = c.title_es || c.title; if (n) all.add(n); });
  if (!all.size) continue;
  pending.push({ id: g.id, n: all.size, done: reviewed.has(g.id) });
}
const done = pending.filter(p => p.done);
const todo = pending.filter(p => !p.done);

console.log('Productos con score revisado: ' + resueltos.length);
console.log('Guias revisadas: ' + done.length + '/' + pending.length + '   pendientes: ' + todo.length);
console.log('Productos-slot pendientes: ' + todo.reduce((a, b) => a + b.n, 0));

console.log('\n--- PRODUCTOS QUE SALEN EN VARIAS GUIAS ---');
console.log('(un solo score; gana la guia donde el veredicto lo coloca mas alto)');
conChoque.forEach(v => {
  console.log('\n  ' + v.score.toFixed(1) + '  ' + v.title);
  console.log('      GANA  ' + v.gana.gid + '  (' + v.gana.score.toFixed(1) + ', puesto ' + v.gana.pos + ')');
  v.alternativas.forEach(a => console.log('      otra  ' + a.gid + '  (' + a.score.toFixed(1) + ', puesto ' + a.pos + ')  [descartada]'));
});

if (problems.length) {
  console.log('\nPROBLEMAS:');
  problems.forEach(m => console.log('  ' + m));
}

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\ndata/products.json escrito.');
