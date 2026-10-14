const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-bass-like-expensive');
[8, 9, 10, 5].forEach(i => {
  const s = g.sections[i];
  console.log('=== SEC[' + i + '] ' + s.heading);
  console.log('EN: ' + s.content);
  console.log('ES: ' + s.content_es);
  console.log('');
});