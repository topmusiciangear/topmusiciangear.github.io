const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars');
const all = JSON.stringify(g);
let i = -1, n = 0;
while ((i = all.indexOf('Precision Bass', i + 1)) > -1 && n < 6) {
  console.log('...' + all.slice(Math.max(0, i - 60), i + 30).replace(/\n/g, ' '));
  n++;
}
