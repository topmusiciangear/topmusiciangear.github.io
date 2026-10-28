const fs = require('fs');
const a = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(a) ? a : a.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const t = g.sections[3].content_es;
console.log(JSON.stringify(t));
console.log('len', t.length);
