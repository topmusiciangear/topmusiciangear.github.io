const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-headphones');
const sec0 = s.sections[0].content_es;
const i = sec0.indexOf('final del d');
console.log(JSON.stringify(sec0.slice(i, i + 400)));
