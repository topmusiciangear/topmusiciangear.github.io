const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-interface');
console.log('CONCLUSION raw cola:');
console.log(JSON.stringify(s.conclusion_es.slice(-700)));
