const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'fender-bass-guide');
console.log('SEC1 ES: ' + s.sections[1].content_es.slice(-200));
console.log('SEC2 ES: ' + s.sections[2].content_es.slice(-260));
