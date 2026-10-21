const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'monitor-setup');
const idx = g.productTable.columns.findIndex(c => /MoPAD/i.test(c.title));
for (const row of g.productTable.rows) {
  console.log(row.label + ': ' + JSON.stringify(row.values[idx]));
}
console.log('\ncolumnas:', JSON.stringify(g.productTable.columns[idx], null, 1));
