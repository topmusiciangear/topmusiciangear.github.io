const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const a = g.find(i => i.id === 'best-bass-amps');
const pt = a.productTable;
for (const r of pt.rows) {
  console.log('ROW:', r.label);
  for (const v of r.values) console.log('   ', JSON.stringify(v));
}