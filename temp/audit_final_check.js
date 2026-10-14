const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const isDuel = g => /-vs-/.test(g.id);
const TPL = ['A Closer Look', 'análisis detallado', 'In Depth', 'Deep Dive', 'Más de cerca'];

let tpl = 0, sinRev = 0, sinEs = 0, dup = 0, faltaReviewTotal = 0;
const listaFalta = [];
guides.forEach(g => {
  const secs = g.sections || [];
  secs.forEach(s => {
    if (TPL.some(t => ((s.heading || s.h || '') + ' ' + (s.heading_es || '')).toLowerCase().includes(t.toLowerCase()))) tpl++;
    if ((s.heading || s.h) && !((s.heading && s.heading_es) || (s.h && s.h_es))) { sinEs++; console.log('sin ES: ' + g.id + ' :: ' + (s.heading || s.h)); }
  });
  const hs = secs.map(s => s.heading || s.h).filter(Boolean);
  if (new Set(hs).size !== hs.length) { dup++; console.log('duplicado: ' + g.id); }
  const feat = [].concat(g.featuredProducts || []);
  const solo = secs.filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  if (!isDuel(g)) {
    const miss = feat.filter(id => !solo.includes(id));
    if (miss.length) { sinRev++; listaFalta.push(g.id + ' (' + miss.length + ')'); }
  }
  const vp = (g.verdictProsCons || []);
  const badVp = vp.filter(v => v.pros.length < 4 || v.cons.length < 4 || v.pros_es.length < 4 || v.cons_es.length < 4);
  if (badVp.length) console.log('veredicto <4+4: ' + g.id + ' -> ' + badVp.map(v => v.name).join(', '));
  // reviews que faltan en la lineup (tabla o veredictos)
  if (g.productTable) {
    g.productTable.columns.forEach(() => {});
  }
});
console.log('\n--- RESULTADO ---');
console.log('encabezados de plantilla: ' + tpl);
console.log('headings sin heading_es: ' + sinEs);
console.log('headings duplicados: ' + dup);
console.log('guias (no-duelo) con destacados sin review: ' + sinRev + (listaFalta.length ? ' -> ' + listaFalta.join(', ') : ''));