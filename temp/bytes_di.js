const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'di-box'));
const i = t.indexOf('comparativa J48');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 60)) : '(no existe)');
