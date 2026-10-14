const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

['best-mic-for-guitar-amps', 'stage-mics', 'best-instrument-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g || !g.productTable) return;
  console.log('=== ' + id + ' ===');
  const npRows = {};
  g.productTable.rows.forEach(r => {
    if (!r.values) return;
    let np = 0;
    r.values.forEach(v => {
      const val = v.value || v.value_es || '';
      if (val.toLowerCase().includes('not published') || val.toLowerCase().includes('no publicado')) np++;
    });
    if (np > 0) {
      const label = r.label_es || r.label || '?';
      npRows[label] = np;
    }
  });
  console.log('Filas con Not published:', JSON.stringify(npRows));

  // Show which products have NP in first NP row
  const firstNpRow = g.productTable.rows.find(r => {
    if (!r.values) return false;
    return r.values.some(v => (v.value || v.value_es || '').toLowerCase().includes('not published') || (v.value || v.value_es || '').toLowerCase().includes('no publicado'));
  });
  if (firstNpRow) {
    const label = firstNpRow.label || firstNpRow.label_es || '?';
    console.log('Primer fila NP:', label);
    const cols = g.productTable.columns.map(c => c.title);
    const npCols = [];
    firstNpRow.values.forEach((v, i) => {
      const val = v.value || v.value_es || '';
      if (val.toLowerCase().includes('not published') || val.toLowerCase().includes('no publicado')) {
        npCols.push(cols[i] || ('col' + i));
      }
    });
    console.log('  Productos con NP:', npCols.join(', '));
  }
  console.log('');
});