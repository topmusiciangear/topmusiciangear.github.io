const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(v => v.id === 'best-nylon-guitars-for-beginners');
const cols = x.productTable.columns.map(c => c.title);
const order = ['Yamaha C40II', 'Cordoba C5', 'Ortega R121', 'Taylor Academy 12e-N', 'Takamine GC1CE', 'Yamaha CG122MSH', 'Fender CN-60S', 'Ibanez GA35TCE', 'Cordoba Protege C1 3/4', 'Admira Alba 4/4'];
console.log('columns:', cols.join(' | '));
for (const r of x.productTable.rows) {
  if (!/^(Top|Back ?& ?[Ss]ides|Scale length)$/.test(r.label)) continue;
  console.log('\nROW ' + r.label + ' / ' + r.label_es);
  r.values.forEach((v, i) => console.log('   ' + (cols[i] || i) + ' => EN "' + v.value + '" | ES "' + (v.value_es || '') + '"'));
}
