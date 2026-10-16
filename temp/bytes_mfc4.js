const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'mics-for-creators').sections[1].content_es);
const i = t.indexOf('sonidos duros');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
const j = t.indexOf('plosivos');
console.log(j > -1 ? JSON.stringify(t.slice(Math.max(0, j - 40), j + 100)) : '(no existe)');
