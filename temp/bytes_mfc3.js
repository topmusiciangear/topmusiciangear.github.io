const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'mics-for-creators').sections[0].content_es);
let idx = -1; let k = 0;
while ((idx = t.indexOf('.html', idx + 1)) > -1 && k < 8) {
  console.log(k + ': ' + JSON.stringify(t.slice(Math.max(0, idx - 60), idx + 70)));
  k++;
}
