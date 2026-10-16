const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'audient-vs-motu'));
const i = t.indexOf('Ambas son opciones serias');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 60)) : '(no existe)');
