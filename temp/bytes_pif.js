const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'portable-interfaces'));
const i = t.indexOf('best-interface.html');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 120)) : '(no existe)');
const j = t.indexOf('backstage');
console.log(j > -1 ? JSON.stringify(t.slice(Math.max(0, j - 60), j + 80)) : '(no existe)');
