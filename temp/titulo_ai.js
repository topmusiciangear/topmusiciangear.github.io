const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('ai-tools: ' + g.find(y => y.id === 'ai-tools-plugins').title_es);
