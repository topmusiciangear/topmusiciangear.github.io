const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
G.forEach(g => {
  if (!g.productTable) return;
  const nc = (g.productTable.columns || []).length;
  const badRows = (g.productTable.rows || []).filter(r => (r.values || []).length !== nc).length;
  if (badRows) {
    console.log(g.id, 'cols=' + nc, 'colsList=[' + g.productTable.columns.map(c => c.title).join(' ; ') + ']');
  }
});