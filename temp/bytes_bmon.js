const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-monitors'));
const i = t.indexOf('no monitores de sala');
console.log(JSON.stringify(t.slice(Math.max(0, i - 60), i + 60)));
