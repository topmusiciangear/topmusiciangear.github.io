const fs = require('fs');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const o = g.find(x => x.id === 'tracking-headphones');
console.log('TABLE:');
o.productTable.rows.forEach(r => console.log(r.label + ': ' + r.values.map(v => v.value).join(' | ')));
console.log('\nINTRO: ' + (o.intro || '').slice(0, 400));
console.log('\nCONCLUSION: ' + o.conclusion.slice(0, 900));
console.log('\nVERDICT: ' + o.verdict);
console.log('\nFAQ: ' + JSON.stringify(o.featuredSnippet, null, 1).slice(0, 3000));
