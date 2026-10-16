const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['budget-monitors', 'best-monitors-for-small-rooms', 'monitor-setup', 'adam-vs-genelec', 'atc-vs-genelec', 'kh750-vs-7050c', 'studio-subwoofers', 'pro-monitors', 'hs8-vs-rokit-7'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
