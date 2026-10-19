const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const R = [
  ['supera el presupuesto', 'se sale del presupuesto'],
  ['punto ideal', 'punto óptimo'],
  ['punto dulce', 'punto óptimo'],
  ['punto medio', 'término medio'],
  ['mejor elección', 'la mejor opción'],
  ['la mejor elección', 'la mejor opción'],
  ['en el presupuesto', 'dentro del presupuesto'],
  ['fuera de presupuesto', 'fuera del presupuesto'],
  ['mejor opción', 'la mejor opción'],
];

function fix(t) {
  if (typeof t !== 'string') return t;
  for (const [a, b] of R) t = t.replace(new RegExp(a, 'gi'), b);
  return t;
}

let n = 0;
for (const g of guides) {
  for (const f of ['verdict_es', 'conclusion_es', 'intro_es', 'metaDesc_es']) {
    if (g[f]) { g[f] = fix(g[f]); n++; }
  }
  for (const s of (g.sections || [])) {
    if (s.content_es) { s.content_es = fix(s.content_es); n++; }
    if (s.heading_es) { s.heading_es = fix(s.heading_es); n++; }
  }
  for (const f of (g.faq || [])) {
    if (f.q_es) { f.q_es = fix(f.q_es); n++; }
    if (f.a_es) { f.a_es = fix(f.a_es); n++; }
  }
  for (const v of (g.verdictProsCons || [])) {
    if (v.pros_es) { v.pros_es = fix(v.pros_es); n++; }
    if (v.cons_es) { v.cons_es = fix(v.cons_es); n++; }
  }
}
for (const p of products) {
  if (p.desc_es) { p.desc_es = fix(p.desc_es); n++; }
  if (p.title_es) { p.title_es = fix(p.title_es); n++; }
}

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Campos procesados: ' + n);
