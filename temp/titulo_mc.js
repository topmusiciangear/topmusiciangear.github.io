const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('midi-controllers: ' + g.find(y => y.id === 'midi-controllers').title_es);
