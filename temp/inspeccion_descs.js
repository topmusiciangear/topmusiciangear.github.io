const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['american-pro-vs-les-paul', 'tuners-bass-guitar', 'best-guitar-plugins', 'stage-mics'].forEach(function (id) {
  const x = g.find(function (y) { return y.id === id; });
  if (!x) { console.log(id, ': NO EXISTE'); return; }
  console.log('===', id, '===');
  ['description', 'description_es', 'desc', 'desc_es', 'metaDesc', 'metaDesc_es'].forEach(function (k) {
    if (x[k]) console.log(' ', k, '(' + String(x[k]).length + '):', JSON.stringify(String(x[k]).slice(-60)));
  });
});
