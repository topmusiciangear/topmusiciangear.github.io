const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'ie900-vs-se846'));
const i = t.indexOf('de mejores auriculares de mezcla');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 60)) : '(no existe)');
