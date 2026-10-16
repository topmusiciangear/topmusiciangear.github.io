const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const t = JSON.stringify(s);
let idx = -1; let k = 0;
while ((idx = t.indexOf('guide-link', idx + 1)) > -1 && k < 30) {
  console.log(k + ': ' + JSON.stringify(t.slice(Math.max(0, idx - 60), idx + 60)));
  k++;
}
