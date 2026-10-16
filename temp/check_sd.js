const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-samplers-drum-computers');
console.log('SEC0: ' + s.sections[0].content_es.slice(0, 200));
