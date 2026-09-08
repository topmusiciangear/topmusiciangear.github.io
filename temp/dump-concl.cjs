const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['live-sound-pa', 'best-pa-speakers', 'active-vs-passive-pa'].forEach(id => {
  const g = arr.find(x => x && x.id === id);
  console.log('==== ' + id + ' ====');
  console.log('conclusion EN:', JSON.stringify(g.conclusion));
  console.log('conclusion_es:', JSON.stringify(g.conclusion_es));
});