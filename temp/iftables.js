const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-interface', 'budget-interfaces', 'portable-interfaces', 'premium-interfaces', 'pro-interfaces', 'studio-interfaces'].forEach(id => {
  const g = G.find(x => x.id === id);
  if (!g) { console.log(id, 'NO EXISTE'); return; }
  console.log('=== ' + id + ' PT=' + !!g.productTable + ' CMP=' + !!g.comparison);
  if (g.productTable) {
    console.log(' cols:', g.productTable.columns.map(c => c.title).join(' | '));
    console.log(' rows:', g.productTable.rows.map(r => r.label).join(' | '));
  }
});