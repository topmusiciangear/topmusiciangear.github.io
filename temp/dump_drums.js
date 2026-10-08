const fs = require('fs');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const o = g.find(x => x.id === 'best-drum-machine');
console.log('TABLE COLS: ' + o.productTable.columns.map(c => c.title).join(' | '));
o.productTable.rows.forEach(r => console.log(r.label + ': ' + r.values.map(v => v.value).join(' | ')));
console.log('\nCONCLUSION: ' + o.conclusion.slice(0, 1200));
console.log('\nVERDICT: ' + o.verdict);
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
['TR-8S', 'DrumBrute Impact', 'Circuit Tracks', 'Digitakt II'].forEach(q => {
  const f = p.filter(x => x.title.includes(q));
  f.forEach(x => console.log('ID', x.id, '|', x.title, '| price=' + x.price));
});
