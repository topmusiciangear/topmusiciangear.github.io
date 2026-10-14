const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
[7, 8, 9, 10, 11, 12].forEach(i => {
  const s = g.sections[i];
  console.log('=== REVIEW[' + i + '] prod=' + JSON.stringify(s.products) + ' ===');
  console.log('EN_FULL: ' + s.content);
  console.log('ES_FULL: ' + s.content_es);
  console.log('');
});
