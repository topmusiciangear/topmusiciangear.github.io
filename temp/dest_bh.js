const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['k371-vs-mdr7506', 'best-headphones', 'open-headphones'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? x.title_es : 'NO EXISTE'));
});
