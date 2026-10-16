const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('best-electric-guitar: ' + (g.find(y => y.id === 'best-electric-guitar') || {}).title_es);
console.log('best-beginner-electric-guitar: ' + (g.find(y => y.id === 'best-beginner-electric-guitar') || {}).title_es);
