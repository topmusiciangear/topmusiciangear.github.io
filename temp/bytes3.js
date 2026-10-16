const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
const i = t.indexOf('Thunderbolt 3 a 24 bits');
console.log(JSON.stringify(t.slice(i, i + 100)));
