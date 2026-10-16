const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'budget-headphones');
console.log(s.conclusion_es.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
