const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['jbl-vs-kali', 'adam-vs-genelec', 'monitor-setup', 'best-headphones'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? x.title_es : 'NO EXISTE'));
});
const s = g.find(x => x.id === 'best-monitors-for-small-rooms');
const t = JSON.stringify(s);
const i = t.indexOf('mejores auriculares de estudio .');
console.log('\ncola sec2: ' + JSON.stringify(t.slice(i - 200, i + 60)));
