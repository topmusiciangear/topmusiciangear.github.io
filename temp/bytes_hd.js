const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'hd490-pro-vs-dt990'));
const i = t.indexOf('escuchas exactamente');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 150), i + 120)) : '(no existe)');
