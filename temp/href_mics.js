const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'stage-mics');
[...s.conclusion_es.matchAll(/href="([^"]+)"/g)].forEach(m => console.log(m[1]));
const t = JSON.stringify(s);
const i = t.indexOf('grabarn');
console.log('###');
console.log(i > -1 ? JSON.stringify(t.slice(i - 120, i + 60)) : '(no existe)');
