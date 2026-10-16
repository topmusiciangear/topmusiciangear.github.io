const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['open-headphones', 'budget-headphones', 'tracking-headphones', 'dt770-vs-dt990'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? x.title_es : 'NO EXISTE'));
});
const s = g.find(x => x.id === 'best-headphones');
const i = s.conclusion_es.indexOf('Para más guías');
console.log('\ncola: ' + JSON.stringify(s.conclusion_es.slice(i, i + 300)));
