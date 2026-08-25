const g = require('./data/guides.json');
g.filter(x => x.productTable).forEach(hub => {
  const rows = hub.productTable.rows.map(r => r.label || r.label_en || Object.values(r)[0]);
  console.log(hub.id + ':', rows.join(' | '));
});
