const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
console.log('productTable rows:', (g.productTable.rows || []).map(r => r.label + ' / ' + (r.label_es || 'MISSING')).join(' | '));
console.log('comparison rows:', ((g.comparison || {}).rows || []).map(r => r.label + ' / ' + (r.label_es || 'MISSING')).join(' | '));