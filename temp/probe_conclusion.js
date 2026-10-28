const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = arr.find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('EN:', JSON.stringify(g.conclusion));
console.log('\nES:', JSON.stringify(g.conclusion_es));
console.log('\nverdict:', JSON.stringify(g.verdict));
console.log('\nverdict_es:', JSON.stringify(g.verdict_es));
