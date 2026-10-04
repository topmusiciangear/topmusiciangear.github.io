const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'guitar-pedals');
console.log('COLS:', g.productTable.columns.map(c => c.title).join(' | '));
console.log('ROWS:', g.productTable.rows.map(r => r.label).join(' | '));
const m = g.intro.match(/<table[\s\S]*?<\/table>/);
console.log('INTRO TABLE:', m ? m[0].replace(/<[^>]*>/g, '|').slice(0, 700) : 'none');