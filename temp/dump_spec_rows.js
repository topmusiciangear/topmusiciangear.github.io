const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
const t = g.productTable;
for (const label of ['Bass extension (stated)', 'Power (RMS)', 'Max SPL']) {
  const r = t.rows.find(x => x.label === label);
  if (!r) continue;
  console.log('== ' + label);
  t.columns.forEach((c, i) => console.log('  ' + c.title + ': ' + r.values[i].value));
}
