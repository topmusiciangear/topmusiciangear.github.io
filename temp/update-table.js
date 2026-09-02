const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(y => y.id === 'open-headphones');
const t = x.productTable;

// Update column name
const r70xCol = t.columns.findIndex(c => c.title === 'Audio-Technica ATH-R70x');
if (r70xCol >= 0) {
  t.columns[r70xCol].title = 'Audio-Technica ATH-R70xa';
  t.columns[r70xCol].title_es = 'Audio-Technica ATH-R70xa';
}

// Update specs for R70xa column
t.rows.forEach(row => {
  if (row.label === 'Weight' && row.values[r70xCol]) {
    row.values[r70xCol].value = '199 g';
    row.values[r70xCol].value_es = '199 g';
  }
  if (row.label === 'Sensitivity' && row.values[r70xCol]) {
    row.values[r70xCol].value = '97 dB';
    row.values[r70xCol].value_es = '97 dB';
  }
  if (row.label === 'Best For' && row.values[r70xCol]) {
    row.values[r70xCol].value = 'Featherweight professional accuracy';
    row.values[r70xCol].value_es = 'Precisi\u00f3n profesional ultraligera';
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Updated product table for R70xa');
