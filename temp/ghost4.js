const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-samplers-drum-computers');
g.productTable.rows.forEach(r => {
  console.log(r.label + ' | v4=' + r.values[3].value + ' | v4es=' + (r.values[3].value_es || ''));
});
console.log('featured:', JSON.stringify(g.featuredProducts));