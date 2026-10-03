const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('COLS: ' + g.productTable.columns.map(c => c.title).join(' / '));
g.productTable.rows.forEach(r => {
  console.log('--- ' + r.label + ' ---');
  r.values.forEach((v, i) => console.log('  [' + i + '] ' + g.productTable.columns[i].title + ' = ' + v.value + ' || ' + v.value_es));
});