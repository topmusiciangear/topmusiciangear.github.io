const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'hs8-vs-rokit-7');
console.log(JSON.stringify(g.comparison.rows[0]));
console.log('total rows:', g.comparison.rows.length);