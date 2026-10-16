const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'rme-vs-motu'));
const i = t.indexOf('Mide ambas');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
