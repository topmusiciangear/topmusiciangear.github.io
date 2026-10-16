const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('best-bass-practice-amps: ' + (g.find(y => y.id === 'best-bass-practice-amps') || {}).title_es);
