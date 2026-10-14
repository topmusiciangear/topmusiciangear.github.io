const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
let nullSections = 0, nullVpc = 0, nullRows = 0;
const affected = [];
guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    if (!s) { nullSections++; affected.push(g.id + ' sections[' + i + ']=null'); }
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    if (!v) { nullVpc++; affected.push(g.id + ' vpc[' + i + ']=null'); }
  });
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach((r, i) => {
      if (!r) { nullRows++; affected.push(g.id + ' row[' + i + ']=null'); }
      else if (r.values) r.values.forEach((v, j) => {
        if (!v) { nullRows++; affected.push(g.id + ' row[' + i + '].val[' + j + ']=null'); }
      });
    });
  }
});
console.log('null sections:', nullSections);
console.log('null vpc:', nullVpc);
console.log('null rows/vals:', nullRows);
console.log('total guides:', guides.length);
affected.slice(0, 20).forEach(a => console.log('  ' + a));
if (affected.length > 20) console.log('  ... y ' + (affected.length - 20) + ' mas');