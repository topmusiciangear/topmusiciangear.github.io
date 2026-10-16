const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('best-headphones-for-mixing: ' + (g.find(y => y.id === 'best-headphones-for-mixing') || {}).title_es);
