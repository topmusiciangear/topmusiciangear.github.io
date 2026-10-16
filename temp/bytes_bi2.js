const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-interface'));
const i = t.indexOf('pones dos previos');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 80)) : '(no existe)');
