const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const p = g.find(x => x.id === 'pro-interfaces');
console.log('title: ' + p.title);
console.log('title_es: ' + p.title_es);
const t = JSON.stringify(g);
let idx = -1; let k = 0;
console.log('ocurrencias anchor pro-interfaces en ES:');
while ((idx = t.indexOf('pro-interfaces_es.html', idx + 1)) > -1 && k < 20) {
  console.log('  ' + JSON.stringify(t.slice(Math.max(0, idx - 10), idx + 130)));
  k++;
}
