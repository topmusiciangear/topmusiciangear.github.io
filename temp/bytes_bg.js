const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'beginner-guitar');
const t = JSON.stringify(s.sections[2].content_es);
const i = t.indexOf('composición');
console.log(JSON.stringify(t.slice(Math.max(0, i - 120), i + 200)));
