// Audita cada guia revisada: comprueba que la nota que se muestra en la pagina
// es la de ESA guia (no la global de products.json) y que no hay productos
// repetidos dentro de una misma guia con notas distintas.
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

console.log('=== REPASO DE LAS ' + Object.keys(overrides).length + ' GUIAS REVISADAS ===\n');

let problemas = 0;
const idANombre = {};
products.forEach(p => { idANombre[p.id] = p.title; });

for (const [gid, map] of Object.entries(overrides)) {
  // 1) resolver cada nombre a un id
  const porId = {};
  const noResuelve = [];
  Object.entries(map).forEach(([name, score]) => {
    const p = findProduct(name);
    if (!p) { noResuelve.push(name); return; }
    if (!porId[p.id]) porId[p.id] = { title: p.title, entradas: [] };
    porId[p.id].entradas.push({ name, score });
  });

  // 2) el mismo producto no puede tener dos notas DENTRO de la misma guia
  const internos = Object.entries(porId).filter(([, v]) => {
    const s = new Set(v.entradas.map(e => e.score));
    return s.size > 1;
  });

  // 3) rango
  const fuera = Object.entries(map).filter(([, s]) => s < 8.7 || s > 9.8);

  const linea = [];
  if (noResuelve.length) linea.push('NO RESUELVE: ' + noResuelve.join(', '));
  if (internos.length) linea.push('MISMA GUIA, NOTAS DISTINTAS: ' + internos.map(([, v]) =>
    v.title + ' (' + v.entradas.map(e => e.name + '=' + e.score).join(' vs ') + ')').join('; '));
  if (fuera.length) linea.push('FUERA DE RANGO: ' + fuera.map(([n, s]) => n + '=' + s).join(', '));

  // 4) mostrar siempre las notas, en orden descendente, para revision visual
  const lista = Object.values(porId)
    .map(v => ({ title: v.title, score: Math.max(...v.entradas.map(e => e.score)) }))
    .sort((a, b) => b.score - a.score);

  console.log(gid + '  (' + lista.length + ' productos, ' + Object.keys(map).length + ' entradas)');
  if (linea.length) { problemas += linea.length; linea.forEach(l => console.log('   !! ' + l)); }
  console.log('   ' + lista.map(x => x.score.toFixed(1) + ' ' + x.title).join('  |  '));
  console.log('');
}

console.log(problemas === 0 ? 'SIN PROBLEMAS en las guias revisadas.' : 'PROBLEMAS: ' + problemas);
