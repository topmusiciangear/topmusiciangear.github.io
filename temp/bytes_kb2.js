const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-keyboard'));
const i = t.indexOf('FP-30X');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 120), i + 80)) : '(no existe)');
