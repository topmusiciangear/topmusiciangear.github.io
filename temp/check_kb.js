const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-keyboard');
console.log('SEC2: ' + s.sections[2].content_es.slice(0, 120));
