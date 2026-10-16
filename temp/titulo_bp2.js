const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('best-plugins title_es: ' + g.find(y => y.id === 'best-plugins').title_es);
