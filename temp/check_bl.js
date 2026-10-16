const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'blx288-vs-ewd');
const t = s.sections[0].content_es;
const i = t.indexOf('Los PG58 incluidos');
console.log(t.slice(i - 10, i + 120));
