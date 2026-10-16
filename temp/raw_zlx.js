const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'zlx-vs-k12');
const t = JSON.stringify(s);
const i = t.indexOf('guía de PA para sonido en vivo');
console.log('SEC3: ' + JSON.stringify(t.slice(Math.max(0, i - 80), i + 120)));
const j = t.indexOf('También te interesa');
console.log('\nCONC: ' + JSON.stringify(t.slice(j, j + 700)));
