const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function normName(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
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
// NEW exact-match fallback (mirrors patched js/app.js)
function guidesListed(pid) {
  const out = guidesById(pid).slice();
  const p = d.find(x => x.id === pid);
  if (!p) return out;
  const pt = normName(p.title), pte = normName(p.title_es);
  g.forEach(gd => {
    if (out.indexOf(gd.id) !== -1) return;
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
      if (n === pt || (pte && n === pte)) { out.push(gd.id); break; }
    }
  });
  return out;
}
let fpCount = 0;
d.forEach(p => {
  const byId = guidesById(p.id);
  const listed = guidesListed(p.id);
  const fbOnly = listed.filter(id => byId.indexOf(id) === -1);
  if (fbOnly.length) { fpCount++; console.log('FP ' + p.id + ' ' + p.title + ' -> ' + fbOnly.join(',')); }
});
console.log('false positives: ' + fpCount);
// verify the 9 fixed products resolve via primary path
[57, 138, 147, 148, 196, 297, 332, 335, 518].forEach(pid => {
  const p = d.find(x => x.id === pid);
  console.log(pid + ' ' + p.title + ' via-id: ' + guidesById(pid).join(','));
});
// spot check previously-correct chips still resolve
[19, 192, 20, 632, 633, 116].forEach(pid => {
  const p = d.find(x => x.id === pid);
  console.log(pid + ' ' + p.title + ' listed: ' + guidesListed(pid).join(','));
});
