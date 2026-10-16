const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'apollo-vs-babyface'));
const i = t.indexOf('lado a lado');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 120)) : '(no existe)');
