const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

['best-mic-for-guitar-amps', 'stage-mics', 'best-instrument-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g || !g.productTable) return;
  console.log('=== ' + id + ' ===');
  console.log('Columnas:', g.productTable.columns.map(c => c.title).join(' | '));
  // find weight row
  const weightRow = g.productTable.rows.find(r => {
    const label = (r.label_es || r.label || '').toLowerCase();
    return label.includes('peso') || label.includes('weight');
  });
  if (weightRow) {
    console.log('Fila peso:', weightRow.label_es || weightRow.label);
    weightRow.values.forEach((v, i) => {
      const val = v.value || v.value_es || '';
      if (val.toLowerCase().includes('not published') || val.toLowerCase().includes('no publicado')) {
        console.log('  NP en col ' + i + ': ' + (g.productTable.columns[i]?.title || '?'));
      }
    });
  }
  console.log('');
});