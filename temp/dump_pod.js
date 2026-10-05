const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-mic-for-podcasting');
g.productTable.rows.forEach(r => {
  console.log('[' + r.label + ']');
  r.values.forEach(v => console.log('  EN: ' + v.value + ' || ES: ' + v.value_es));
});