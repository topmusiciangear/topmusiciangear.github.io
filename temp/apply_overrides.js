// Aplica temp/score_overrides.js a data/products.json y reporta el progreso
// guia por guia. NO asigna scores automaticos: solo aplica lo que se ha
// revisado a mano y muestra lo que falta.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const findProduct = (name) =>
  products.find(p => p.title === name || p.title_es === name) ||
  products.find(p => p.title.includes(name) || (p.title_es || '').includes(name));

let applied = 0;
const missing = [];
for (const [guideId, map] of Object.entries(overrides)) {
  for (const [name, score] of Object.entries(map)) {
    const p = findProduct(name);
    if (!p) { missing.push(guideId + ' -> ' + name + ' (no existe en products.json)'); continue; }
    if (score < 8.7 || score > 9.8) { missing.push(guideId + ' -> ' + name + ' (' + score + ' fuera de rango 8.7-9.8)'); continue; }
    p.score = score;
    applied++;
  }
}

// Inventario de guias pendientes
const reviewed = new Set(Object.keys(overrides));
const pending = [];
for (const g of guides) {
  const cols = (g.productTable && g.productTable.columns) || [];
  const inTable = new Set(cols.map(c => c.title_es || c.title));
  const all = new Set();
  (g.verdictProsCons || []).forEach(v => { if (v.name) all.add(v.name); });
  inTable.forEach(n => all.add(n));
  if (all.size === 0) continue;
  pending.push({ id: g.id, title: g.title, n: all.size, done: reviewed.has(g.id) });
}
pending.sort((a, b) => (a.done === b.done ? b.n - a.n : a.done ? 1 : -1));

const done = pending.filter(p => p.done);
const todo = pending.filter(p => !p.done);
console.log('Overrides aplicados: ' + applied);
if (missing.length) { console.log('\nPROBLEMAS:'); missing.forEach(m => console.log('  ' + m)); }
console.log('\nGuias revisadas a mano: ' + done.length + '/' + pending.length);
console.log('Guias pendientes: ' + todo.length);
console.log('\n--- SIGUIENTES GUIAS (por numero de productos) ---');
todo.slice(0, 30).forEach(p => console.log('  ' + String(p.n).padStart(2) + '  ' + p.id));

// El orden de la tabla NO es un ranking de calidad (va por precio o por
// antiguedad del articulo), asi que la comprobacion de orden no puede usar
// productTable. Solo se reportan los overrides para revision visual.
console.log('\n--- OVERRIDES DE GUIAS REVISADAS ---');
for (const g of guides) {
  const map = overrides[g.id];
  if (!map) continue;
  console.log('\n' + g.id);
  Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .forEach(([n, s]) => console.log('  ' + s.toFixed(2) + '  ' + n));
}

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\ndata/products.json escrito.');
