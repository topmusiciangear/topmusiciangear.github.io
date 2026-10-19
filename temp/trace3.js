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

const porId = {};
for (const [gid, map] of Object.entries(overrides)) {
  Object.entries(map).forEach(([name, score], pos) => {
    const p = findProduct(name);
    if (!p) return;
    if (!porId[p.id]) porId[p.id] = { title: p.title, puntos: [] };
    porId[p.id].puntos.push({ gid, pos, score });
  });
}

const multi = Object.entries(porId).filter(([, v]) => v.puntos.length > 1);
console.log('Productos puntuados en mas de una guia: ' + multi.length);
console.log('');

let conflictos = 0;
multi.forEach(([id, v]) => {
  const max = Math.max(...v.puntos.map(p => p.score));
  const min = Math.min(...v.puntos.map(p => p.score));
  const hayConflicto = max - min > 0.001;
  if (hayConflicto) conflictos++;
  console.log('id=' + id + ' "' + v.title + '"' + (hayConflicto ? '   <-- CONFLICTO' : ''));
  v.puntos.forEach(p => console.log('      ' + p.score.toFixed(1) + '   ' + p.gid + '  (pos ' + p.pos + ')'));
  console.log('      gana: ' + max.toFixed(1));
});
console.log('\nConflictos reales: ' + conflictos);
