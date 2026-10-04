const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
console.log(JSON.stringify(t.slice(619240, 619345)));