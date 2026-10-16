const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['mixing-plugins', 'vocal-plugins', 'fx-plugins', 'pro-plugins'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
console.log('soundtoys-vs-khs: ' + (g.find(y => y.id === 'soundtoys-vs-khs') || {}).title_es);
