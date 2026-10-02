const G = require('../data/guides.json');
const P = require('../data/products.json');
const g = G.find(x => x.id === 'best-bass-home-office');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL: ' + m); } };
// table complete
g.productTable.rows.forEach(r => {
  ok(r.values.length === g.productTable.columns.length, 'row ' + r.label + ' len');
  r.values.forEach((v, i) => {
    ok(v.value && v.value_es, 'empty cell ' + r.label + ' col' + i);
  });
});
// verdicts 4/4 + names match columns
const cols = g.productTable.columns.map(c => c.title);
g.verdictProsCons.forEach(v => {
  ok(cols.includes(v.name), 'veredicto huerfano: ' + v.name);
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => ok((v[k] || []).length >= 4, v.name + '.' + k + ' <4'));
});
cols.forEach(t => ok(g.verdictProsCons.some(v => v.name === t), 'sin veredicto: ' + t));
// sections cover all columns
const covered = new Set(g.sections.flatMap(s => s.products || []));
cols.forEach(t => {
  const p = P.find(x => x.title === t);
  ok(p && covered.has(p.id), 'sin seccion: ' + t);
});
// featured
[528, 529, 530, 531, 532, 533, 534, 535, 536, 537].forEach(id => ok(g.featuredProducts.includes(id), 'featured falta ' + id));
// catalog entries sanity
[536, 537].forEach(id => {
  const p = P.find(x => x.id === id);
  ok(p && p.price && p.img && p.stores, 'catalogo ' + id);
  Object.values(p.stores).forEach(u => ok(/^https:\/\//.test(u) && !/%20|irgwc|irpid|siid|_gl=|srsltid/.test(u), 'URL sucia ' + id + ': ' + u.slice(0, 80)));
});
// TB-4P remnants + title counts
const s = JSON.stringify(g);
ok(!/TB-4P|TB4P|TRAULB|Traveler Guitar TB/.test(s), 'restos TB-4P');
console.log('titleTag: ' + g.titleTag.length + 'ch | desc: ' + g.description.length + 'ch | faq: ' + g.faq.length);
console.log(fails ? ('FALLOS: ' + fails) : 'AUDIT OK: tabla 10x10 completa, 10 veredictos 4/4, 10 secciones, sin restos');
