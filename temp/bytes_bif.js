const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-interfaces'));
const i = t.indexOf('confiable');
console.log(JSON.stringify(t.slice(Math.max(0, i - 80), i + 60)));
