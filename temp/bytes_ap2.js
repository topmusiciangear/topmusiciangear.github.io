const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'american-pro-vs-les-paul'));
const i = t.indexOf('mástil atornillado de la Strat ofrece');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 40), i + 250)) : '(no existe)');
