const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-guitar-home-office', 'guitar-bass-amps'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
