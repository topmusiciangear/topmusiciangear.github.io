const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'daw-guide');
[0, 1].forEach(i => {
  const t = JSON.stringify(s.sections[i].content_es);
  let idx = -1; let k = 0;
  console.log('--- SEC' + i + ' ---');
  while ((idx = t.indexOf('.html', idx + 1)) > -1 && k < 8) {
    console.log(JSON.stringify(t.slice(Math.max(0, idx - 60), idx + 60)));
    k++;
  }
});
