const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('guitar-pedals: ' + g.find(y => y.id === 'guitar-pedals').title_es);
