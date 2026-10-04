const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const labs = {};
G.forEach(g => {
  const bump = (en, es) => {
    if (en && es && en === es && /[A-Za-z]{3,}/.test(en)) labs[en] = (labs[en] || 0) + 1;
  };
  if (g.productTable) {
    (g.productTable.columns || []).forEach(c => bump(c.title, c.title_es));
    (g.productTable.rows || []).forEach(r => bump(r.label, r.label_es));
  }
  if (g.comparison) (g.comparison.rows || []).forEach(r => bump(r.label, r.label_es));
});
Object.entries(labs).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(v + 'x [' + k + ']'));