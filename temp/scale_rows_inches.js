const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const gd of g) {
  for (const r of (gd.productTable?.rows || [])) {
    if (!/scale|escala/i.test(r.label || '')) continue;
    r.values.forEach((v, i) => {
      const col = gd.productTable.columns[i]?.title || ('col' + i);
      const val = v.value || '';
      if (/\bin\b|"/.test(val) && !/mm/.test(val)) {
        console.log(gd.id + ' | ' + col + ' | ' + val + ' | ' + (v.value_es || '') + ' | label ' + r.label);
      }
    });
  }
}
