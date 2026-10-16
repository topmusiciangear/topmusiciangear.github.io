const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log(JSON.stringify(g.find(x => x.id === 'monitor-setup').conclusion_es));
