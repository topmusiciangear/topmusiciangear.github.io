const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
let i = t.indexOf('inclinaci');
console.log(JSON.stringify(t.slice(i - 40, i + 60)));
i = t.indexOf('meter EQ');
console.log(JSON.stringify(t.slice(i - 40, i + 60)));
