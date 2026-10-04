const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let pt = 0, comp = 0;
G.forEach(g => {
  if (g.productTable) (g.productTable.rows || []).forEach(r => { if (r.label === 'Price') pt++; });
  if (g.comparison) (g.comparison.rows || []).forEach(r => { if (r.label === 'Price') comp++; });
});
console.log('productTable Price:', pt, '| comparison Price:', comp);