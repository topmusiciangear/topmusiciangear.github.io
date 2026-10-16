const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-interface');
const sec8 = s.sections[8].content_es;
const i = sec8.indexOf('iD14 MkII');
console.log(sec8.slice(i, i + 200));
