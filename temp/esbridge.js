const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-5-string-basses');
const r = g.productTable.rows.find(r => r.label === 'Bridge');
r.label_es = 'Puente';
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');