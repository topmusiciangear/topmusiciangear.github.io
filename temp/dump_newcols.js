const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
for (const [id, from] of [['best-reverb-delay', 3], ['best-looper-pedals', 2]]) {
  const g = G.find(v => v.id === id);
  console.log('\n######## ' + id);
  g.productTable.columns.forEach((c, i) => { if (i >= from) console.log('COL ' + i + ': ' + c.title); });
  g.productTable.rows.forEach(r => {
    console.log('## ' + r.label + ': ' + r.values.slice(from).map(c => c.value).join(' || '));
  });
}
