const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('dxr-vs-prx: ' + (g.find(x => x.id === 'dxr-vs-prx') || {}).title_es);
