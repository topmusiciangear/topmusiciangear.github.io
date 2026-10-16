const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('budget-bass-like-expensive: ' + (g.find(y => y.id === 'budget-bass-like-expensive') || {}).title_es);
