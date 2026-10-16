const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'portable-interfaces'));
let idx = -1; let k = 0;
while ((idx = t.indexOf('interface.html', idx + 1)) > -1 && k < 12) {
  console.log(k + ': ' + JSON.stringify(t.slice(Math.max(0, idx - 40), idx + 90)));
  k++;
}
