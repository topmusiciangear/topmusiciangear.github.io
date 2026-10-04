const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let g = G.find(x => x.id === 'best-samplers-drum-computers');
console.log('SAMPLERS BestFor:', g.productTable.rows[0].values.map(v => v.value).join(' | '));
console.log('SAMPLERS Type:', g.productTable.rows[1].values.map(v => v.value).join(' | '));
g = G.find(x => x.id === 'best-grooveboxes');
console.log('GROOVE Type:', g.productTable.rows[1].values.map(v => v.value).join(' | '));
g = G.find(x => x.id === 'best-digital-pianos');
console.log('PIANO Type:', g.productTable.rows[1].values.map(v => v.value).join(' | '));
g = G.find(x => x.id === 'stream-controllers');
['Keys / Controls', 'Connectivity', 'Software', 'Price'].forEach(lab => {
  const r = g.productTable.rows.find(r => r.label === lab);
  console.log('STREAM ' + lab + ':', r.values.map(v => v.value).join(' | '));
});