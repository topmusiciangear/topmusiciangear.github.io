const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-headphones-for-mixing');
const t = s.sections[0].content_es;
const i = t.indexOf('Los abiertos (');
console.log(t.slice(i, i + 200));
