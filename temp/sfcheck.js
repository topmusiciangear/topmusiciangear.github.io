const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-interface', 'budget-interfaces', 'portable-interfaces', 'premium-interfaces'].forEach(id => {
  const g = G.find(x => x.id === id);
  const r = g.productTable.rows.find(r => r.label === 'Special Features' || r.label === 'Monitoring / Extras');
  console.log('=== ' + id + ' [' + r.label + ']');
  r.values.forEach(v => console.log('  - ' + v.value));
});