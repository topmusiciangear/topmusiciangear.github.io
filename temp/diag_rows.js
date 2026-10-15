const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

['best-reverb-delay','best-looper-pedals'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const pt = g.productTable;
  const nCols = pt.columns.length;
  console.log('\n### ' + id + '  columnas ' + nCols);
  pt.rows.forEach(r => {
    console.log('  ' + r.label.padEnd(20) + r.values.length + ' valores');
    if (r.values.length === nCols + 1) {
      console.log('     sobrante en el indice ' + r.values.length - 1 + '? valores: ' + r.values.map(v=>v.value).join(' ~ '));
    }
  });
});