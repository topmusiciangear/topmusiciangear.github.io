const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'katana-vs-dsl');
const t = s.sections[3].content_es;
const i = t.indexOf('Sitúa el Katana');
console.log(t.slice(i, i + 280));
