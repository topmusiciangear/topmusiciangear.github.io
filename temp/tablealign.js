const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let bad = 0;
G.forEach(g => {
  if (!g.productTable) return;
  const nc = (g.productTable.columns || []).length;
  (g.productTable.rows || []).forEach((r, i) => {
    const nv = (r.values || []).length;
    if (nv !== nc) {
      if (bad < 12) console.log(g.id, 'cols=' + nc, 'row' + i + ' "' + (r.label || '') + '" vals=' + nv);
      bad++;
    }
  });
});
console.log('filas desalineadas:', bad);
// show one full header list
const s = G.find(g => g.id === 'starter-studio' || G[0].id);
const g2 = G.find(g => g.id === 'starter-studio') || G[0];
console.log(g2.id, 'COLS:', g2.productTable.columns.map(c => c.title).join(' | '));