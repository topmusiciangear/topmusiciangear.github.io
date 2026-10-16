const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'pro-basses');
console.log('INTRO final: [' + s.intro_es.slice(-60) + ']');
