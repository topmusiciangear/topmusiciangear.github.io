// Genera js/guide-scores.js a partir de temp/score_overrides.js + name_aliases.js
// para que build-guides.js pueda usar la nota de CADA guia.
//
// Un producto puede tener notas distintas en guias distintas: manda la de la
// guia en la que se esta mostrando.
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

// La pagina ES muestra p.title_es y la EN muestra p.title; ademas el titulo
// lleva el sufijo de unidad (" (cada uno)", " (par)"). Se indexa por TODAS las
// formas para que el badge encuentre la nota en cualquier idioma.
const SUFIJOS = [' (cada uno)', ' (par)', ' (each)', ' (pair)', ' (2 auriculares)', ' (2 headsets)'];

const indexar = (obj, clave, score) => {
  const k = String(clave).trim();
  obj[k] = score;
  const base = k.replace(/ \((cada uno|par|each|pair|2 auriculares|2 headsets)\)$/, '');
  SUFIJOS.forEach(sfx => { obj[base + sfx] = score; });
  const nk = norm(base);
  if (nk) obj['#' + nk] = score;
};

const out = {};
let n = 0;
const problemas = [];
for (const [gid, map] of Object.entries(overrides)) {
  out[gid] = {};
  for (const [name, score] of Object.entries(map)) {
    const p = findProduct(name);
    if (!p) { problemas.push(gid + ' -> "' + name + '" no resuelve'); continue; }
    indexar(out[gid], p.title, score);
    if (p.title_es) indexar(out[gid], p.title_es, score);
    n++;
  }
}

const js = '// GENERADO AUTOMATICAMENTE por temp/gen_guide_scores.js - no editar a mano.\n' +
  '// Nota editorial por GUIA: un producto puede tener distinta nota en cada\n' +
  '// guia segun la posicion que ocupa en el veredicto/conclusion de esa guia.\n' +
  'var GUIDE_SCORES = ' + JSON.stringify(out, null, 1) + ';\n';

fs.writeFileSync(B + 'js/guide-scores.js', js, 'utf8');
console.log('Guias con nota propia: ' + Object.keys(out).length);
console.log('Puntuaciones escritas: ' + n);
if (problemas.length) { console.log('PROBLEMAS:'); problemas.forEach(x => console.log('  ' + x)); }
console.log('js/guide-scores.js generado (' + (js.length / 1024).toFixed(1) + ' KB)');
