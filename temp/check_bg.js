const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'beginner-guitar');
const t = s.sections[2].content_es;
const i = t.indexOf('Para más opciones acústicas');
console.log(t.slice(i, i + 400));
