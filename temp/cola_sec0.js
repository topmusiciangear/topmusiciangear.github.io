const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'live-sound-pa');
const i = JSON.stringify(s).indexOf('consulta nuestros');
console.log(JSON.stringify(JSON.stringify(s).slice(i, i + 400)));
