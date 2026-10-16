const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('m50x-vs-dt770: ' + g.find(y => y.id === 'm50x-vs-dt770').title_es);
