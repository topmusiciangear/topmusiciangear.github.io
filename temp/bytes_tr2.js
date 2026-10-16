const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'tracking-headphones'));
const i = t.indexOf('modales para grabar');
console.log(JSON.stringify(t.slice(Math.max(0, i - 80), i + 160)));
