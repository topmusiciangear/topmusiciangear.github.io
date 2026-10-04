const fs = require('fs');
const PF = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(PF);
P.find(x => x.id === 553).title = 'Fender CN-60S (Nylon)';
P.find(x => x.id === 553).title_es = 'Fender CN-60S (Nylon)';
P.find(x => x.id === 554).title = 'Takamine GC1 (Nylon)';
P.find(x => x.id === 554).title_es = 'Takamine GC1 (Nylon)';
fs.writeFileSync(PF, JSON.stringify(P, null, 2));
const GF = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(GF);
const g = G.find(x => x.id === 'beginner-guitar');
g.sections.forEach(s => {
  if (s.heading === 'Fender CN-60S Nylon: A Closer Look') { s.heading = 'Fender CN-60S (Nylon): A Closer Look'; s.heading_es = 'Fender CN-60S (Nylon): análisis detallado'; }
  if (s.heading === 'Takamine GC1 Classical: A Closer Look') { s.heading = 'Takamine GC1 (Nylon): A Closer Look'; s.heading_es = 'Takamine GC1 (Nylon): análisis detallado'; }
});
g.productTable.columns.forEach(c => {
  if (c.title === 'Fender CN-60S Nylon') { c.title = 'Fender CN-60S (Nylon)'; c.title_es = 'Fender CN-60S (Nylon)'; }
  if (c.title === 'Takamine GC1 Classical') { c.title = 'Takamine GC1 (Nylon)'; c.title_es = 'Takamine GC1 (Nylon)'; }
});
g.verdictProsCons.forEach(v => {
  if (v.name === 'Fender CN-60S Nylon') { v.name = 'Fender CN-60S (Nylon)'; v.name_es = 'Fender CN-60S (Nylon)'; }
  if (v.name === 'Takamine GC1 Classical') { v.name = 'Takamine GC1 (Nylon)'; v.name_es = 'Takamine GC1 (Nylon)'; }
});
fs.writeFileSync(GF, JSON.stringify(G, null, 2));
console.log('renombrado (Nylon)');