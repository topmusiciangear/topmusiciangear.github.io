const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors');
console.log('EN SEC12 cola: ' + s.sections[12].content.slice(-300));
console.log('studio-subwoofers-setup: ' + (g.find(y => y.id === 'studio-subwoofers-setup') || {}).title_es);
