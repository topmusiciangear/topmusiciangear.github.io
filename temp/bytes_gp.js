const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-overdrive-distortion', 'best-reverb-delay'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
const s = g.find(x => x.id === 'guitar-pedals');
[0, 1].forEach(i => {
  const t = JSON.stringify(s.sections[i].content_es);
  let idx = -1; let k = 0;
  console.log('--- SEC' + i + ' ---');
  while ((idx = t.indexOf('.html', idx + 1)) > -1 && k < 8) {
    console.log(JSON.stringify(t.slice(Math.max(0, idx - 50), idx + 50)));
    k++;
  }
});
