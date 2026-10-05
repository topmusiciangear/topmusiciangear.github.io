const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-practice-amps', 'best-bass-amps', 'best-bass-practice-amps'].forEach(id => {
  const g = G.find(x => x.id === id);
  if (!g.productTable) { console.log('##### ' + id + ' NO TABLE'); return; }
  console.log('##### ' + id);
  console.log('cols: ' + g.productTable.columns.map(c => c.title).join(' | '));
  g.productTable.rows.forEach(r => {
    console.log('[' + r.label + '] ' + r.values.map(v => v.value).join(' | '));
  });
});