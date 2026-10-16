const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('stage-wedges title_es: ' + g.find(x => x.id === 'stage-wedges').title_es);
