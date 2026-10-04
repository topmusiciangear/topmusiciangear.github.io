const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const labs = {};
G.forEach(g => {
  if (g.productTable) (g.productTable.rows || []).forEach(r => {
    const k = r.label + ' / ' + (r.label_es || '');
    if (/price|precio|estim/i.test(k)) labs[k] = (labs[k] || 0) + 1;
  });
  if (g.comparison) (g.comparison.rows || []).forEach(r => {
    const k = 'COMP: ' + r.label + ' / ' + (r.label_es || '');
    if (/price|precio|estim/i.test(k)) labs[k] = (labs[k] || 0) + 1;
  });
});
Object.entries(labs).forEach(([k, v]) => console.log(v + 'x [' + k + ']'));