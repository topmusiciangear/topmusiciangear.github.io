const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors');
const t = JSON.stringify(s);
const i = t.indexOf('Para más guías de monitores');
console.log(JSON.stringify(t.slice(i, i + 900)));
['budget-monitors', 'pro-monitors', 'monitor-setup', 'studio-subwoofers-setup', 'hs8-vs-r7'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? x.title_es : 'NO EXISTE'));
});
