const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-samplers-drum-computers');
g.productTable.rows.forEach(r => {
  console.log(r.label + ' | v3=' + r.values[2].value);
});