const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'stream-controllers');
const t = s.conclusion_es;
const i = t.indexOf('guía de mejores interfaces');
console.log(JSON.stringify(t.slice(Math.max(0, i - 40), i + 200)));
