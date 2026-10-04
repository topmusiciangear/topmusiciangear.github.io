const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let dash = 0; const ex = [];
G.forEach(g => {
  if (g.productTable) {
    const cols = g.productTable.columns.map(c => c.title);
    const pr = (g.productTable.rows || []).find(r => /estim/i.test(r.label || ''));
    if (pr) pr.values.forEach((v, i) => {
      if (v.value === '—') { dash++; if (ex.length < 15) ex.push(g.id + ' col' + i + ' "' + cols[i] + '"'); }
    });
  }
});
console.log('dash cells:', dash);
ex.forEach(e => console.log(' ' + e));