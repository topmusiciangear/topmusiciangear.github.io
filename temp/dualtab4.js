const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
console.log('comparison:', JSON.stringify(g.comparison).slice(0, 600));
console.log('productTable title:', g.productTable.title);