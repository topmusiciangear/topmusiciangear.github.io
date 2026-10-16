const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'blx288-vs-ewd'));
const i = t.indexOf('Los PG58 son');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 40), i + 120)) : '(no existe)');
