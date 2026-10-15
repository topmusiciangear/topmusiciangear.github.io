// AUDIT CORRECTO: un veredicto tiene review si alguna seccion tiene un encabezado
// que hable de ese producto (las secciones incluyen las alternativas en products[])
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
// clave de un titulo: hasta el parentesis, sin conectores de marketing
function clave(titulo) {
  let t = norm(titulo).replace(/\b(the|a|an|series|pro|ii|iii|mkii|mk iii|with|and)\b/g, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}
// el heading menciona al producto?
function menciona(heading, titulo) {
  const h = norm(heading);
  const base = norm(titulo.split('(')[0]);
  if (h.indexOf(base) > -1 && base.length > 3) return true;
  // coincidencia por tokens significativos
  const toks = clave(titulo).split(' ').filter(w => w.length > 2);
  if (!toks.length) return false;
  const hits = toks.filter(t => h.indexOf(t) > -1).length;
  return hits >= Math.ceil(toks.length * 0.7);
}

const filas = [];
let N = 0;
guides.forEach(g => {
  const secs = (g.sections || []).filter(s => (s.heading || s.h));
  const heads = secs.map(s => norm(s.heading || s.h));
  const vp = g.verdictProsCons || [];
  const falta = [];
  const vistos = new Set();
  vp.forEach(v => {
    const nombre = (v.name || v.title || '').trim();
    if (!nombre || vistos.has(nombre)) return;
    vistos.add(nombre);
    // buscar el producto en el catalogo por nombre exacto
    const prod = arr.find(p => p.title === nombre) || arr.find(p => norm(p.title).indexOf(norm(nombre)) === 0);
    if (!prod) return;
    const pid = prod.id;
    // ¿el producto esta de verdad en esta guia? (aparece en products de alguna seccion o en featured)
    const enGuia = (g.featuredProducts || []).indexOf(pid) > -1 ||
      secs.some(s => (s.products || []).indexOf(pid) > -1) ||
      (g.productTable && g.productTable.columns.some(c => c.title === nombre));
    if (!enGuia) return;
    if (!heads.some(h => menciona(h, nombre))) falta.push({ id: pid, t: nombre });
  });
  if (falta.length) { filas.push({ g, falta, totalVp: vistos.size, fichas: secs.length }); N += falta.length; }
});

filas.sort((a, b) => b.falta.length - a.falta.length);
console.log('VEREDICTOS EN LA GUIA SIN REVIEW PROPIO (metrica corregida)');
console.log('TOTAL: ' + filas.length + ' guias | ' + N + ' reviews pendientes\n');
filas.forEach((f, i) => {
  console.log((i + 1) + '. ' + f.g.title_es);
  console.log('   /guides/' + f.g.id + '.html  |  ' + f.fichas + ' secciones |  FALTAN ' + f.falta.length);
  f.falta.forEach(x => console.log('      - ' + x.t + '  (id ' + x.id + ')'));
});
fs.writeFileSync(BASE + 'temp/pending_real.txt',
  filas.map((f, i) => (i + 1) + '. ' + f.g.id + ' | ' + f.g.title_es + ' | FALTAN ' + f.falta.length + ': ' + f.falta.map(x => x.t).join('; ')).join('\n'));
console.log('\nguardado: temp/pending_real.txt');