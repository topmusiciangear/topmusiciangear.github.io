const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'stream-controllers');
console.log('PRICE row:', g.productTable.rows.find(r => r.label === 'Price').values.map(v => v.value).join(' | '));
console.log('KEYS row:', g.productTable.rows.find(r => /Keys/.test(r.label)).values.map(v => v.value).join(' | '));