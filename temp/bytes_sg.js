const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-shotgun-mics'));
const i = t.indexOf('sonido lateral');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 40), i + 60)) : '(no existe)');
