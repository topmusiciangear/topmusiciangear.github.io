const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
console.log('verdictProsCons[0] claves: ' + Object.keys(g.verdictProsCons[0]).join(', '));
console.log(JSON.stringify(g.verdictProsCons[0], null, 1).slice(0, 900));