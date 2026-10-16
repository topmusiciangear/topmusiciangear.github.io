const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'budget-mics');
console.log('INTRO raw: ' + s.intro_es.slice(0, 300));
console.log('\nSEC25 EN:');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(txt(s.sections[25].content));
