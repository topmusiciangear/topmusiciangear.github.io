const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const p = g.find(x => x.id === 'pro-guitars');
console.log('title: ' + p.title);
console.log('title_es: ' + p.title_es);
console.log('intro_es: ' + (p.intro_es || '').slice(0, 200));
