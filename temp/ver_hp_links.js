const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-headphones-for-mixing', 'hd490-pro-vs-dt990'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? 'existe :: ' + x.title_es : 'NO EXISTE'));
  console.log('  html EN: ' + fs.existsSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + id + '.html') +
    '  html ES: ' + fs.existsSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + id + '_es.html'));
});
