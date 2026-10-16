const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
const i = t.indexOf('doubles the budget');
console.log(JSON.stringify(t.slice(i - 60, i + 40)));
