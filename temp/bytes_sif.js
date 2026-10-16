const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'streaming-interfaces'));
const i = t.indexOf('Topa en 48');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
