const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function normName(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
// replicate findProductGuides from js/app.js (both paths tracked separately)
function guidesById(pid) {
  const out = [];
  g.forEach(gd => {
    let ids = [];
    if (gd.featuredProducts) ids = ids.concat(gd.featuredProducts);
    if (gd.products) ids = ids.concat(gd.products);
    if (gd.sections) gd.sections.forEach(s => { if (s.products) ids = ids.concat(s.products); });
    if (ids.indexOf(pid) !== -1) out.push(gd.id);
  });
  return out;
}
function guidesByFallback(pid) {
  const out = [];
  const p = d.find(x => x.id === pid);
  if (!p) return out;
  const pt = normName(p.title), pte = normName(p.title_es);
  g.forEach(gd => {
    const names = [];
    if (gd.productTable && gd.productTable.columns) gd.productTable.columns.forEach(c => {
      if (c.title) names.push(c.title);
      if (c.title_es) names.push(c.title_es);
    });
    if (gd.verdictProsCons) gd.verdictProsCons.forEach(v => {
      if (v.name) names.push(v.name);
      if (v.name_es) names.push(v.name_es);
    });
    for (const raw of names) {
      const n = normName(raw);
      if (!n || n.length < 4) continue;
      if (pt.indexOf(n) === 0 || n.indexOf(pt) === 0 || (pte && (pte.indexOf(n) === 0 || n.indexOf(pte) === 0))) {
        if (out.indexOf(gd.id) === -1) out.push(gd.id);
        break;
      }
    }
  });
  return out;
}

const falsePositives = []; // guide listed ONLY via fallback (not by id)
const noGuides = [];
d.forEach(p => {
  const byId = guidesById(p.id);
  const byFb = guidesByFallback(p.id);
  const fbOnly = byFb.filter(id => byId.indexOf(id) === -1);
  if (fbOnly.length) falsePositives.push({ id: p.id, title: p.title, guides: fbOnly, byId });
  if (!byId.length && !byFb.length) noGuides.push({ id: p.id, title: p.title });
});

console.log('=== FALSE POSITIVES (fallback-only guides) ===');
falsePositives.forEach(f => console.log(f.id + ' | ' + f.title + ' | FALSE: ' + f.guides.join(', ') + ' | REAL: ' + (f.byId.join(', ') || '(none)')));
console.log('count: ' + falsePositives.length);
console.log('');
console.log('=== PRODUCTS WITH NO GUIDES AT ALL ===');
noGuides.forEach(f => console.log(f.id + ' | ' + f.title));
console.log('count: ' + noGuides.length);
console.log('');
console.log('total products: ' + d.length + ' | total guides: ' + g.length);
