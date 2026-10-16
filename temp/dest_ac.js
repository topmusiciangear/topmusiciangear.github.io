const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('martin-d28-vs-taylor-314: ' + (g.find(y => y.id === 'martin-d28-vs-taylor-314') || {}).title_es);
