const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
let n = 0;
G.forEach(g => {
  if (g.productTable) {
    (g.productTable.rows || []).forEach(r => {
      if ((r.label || '') === 'Price') { r.label = 'Estimated Price'; n++; }
      if ((r.label_es || '') === 'Precio') { r.label_es = 'Precio estimado'; n++; }
    });
  }
  if (g.comparison) {
    (g.comparison.rows || []).forEach(r => {
      if ((r.label || '') === 'Price') { r.label = 'Estimated Price'; n++; }
      if ((r.label_es || '') === 'Precio') { r.label_es = 'Precio estimado'; n++; }
    });
  }
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('labels cambiadas:', n);