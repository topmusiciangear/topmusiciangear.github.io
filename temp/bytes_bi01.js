const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-interface');
const t = JSON.stringify(s.sections[0].content_es);
let idx = -1; let k = 0;
while ((idx = t.indexOf('.html', idx + 1)) > -1 && k < 10) {
  console.log(k + ': ' + JSON.stringify(t.slice(Math.max(0, idx - 70), idx + 60)));
  k++;
}
