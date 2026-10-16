const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-electric-guitars-2026', 'pro-guitars'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
const s = g.find(x => x.id === 'best-electric-guitar');
[0, 1, 2, 3].forEach(i => {
  const t = JSON.stringify(s.sections[i].content_es);
  let idx = -1; let k = 0;
  console.log('--- SEC' + i + ' ---');
  while ((idx = t.indexOf('.html', idx + 1)) > -1 && k < 8) {
    console.log(JSON.stringify(t.slice(Math.max(0, idx - 50), idx + 60)));
    k++;
  }
});
