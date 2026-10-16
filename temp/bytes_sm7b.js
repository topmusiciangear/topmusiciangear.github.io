const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'sm7b-vs-nt1'));
const i = t.indexOf('guía del mejor micrófono');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 120)) : '(no existe)');
