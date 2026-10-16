const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-beginner-electric-guitar');
const t = JSON.stringify(s.sections[4].content_es);
console.log(JSON.stringify(t.slice(0, 220)));
