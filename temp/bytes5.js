const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')));
const i = t.indexOf('Depende de tu setup');
console.log(JSON.stringify(t.slice(i - 30, i + 60)));
