const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('ew-iem: ' + g.find(y => y.id === 'ew-iem-g4-twin-vs-psm300').title_es);
console.log('ie900: ' + g.find(y => y.id === 'ie900-vs-se846').title_es);
