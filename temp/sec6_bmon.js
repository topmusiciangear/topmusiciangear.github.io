const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'budget-monitors');
console.log(s.sections[6].content_es.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
