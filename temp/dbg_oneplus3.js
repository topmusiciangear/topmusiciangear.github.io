const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-drum-machine');
const s = JSON.stringify(d);
let i = -1, k = 0;
while ((i = s.indexOf('One+', i + 1)) >= 0 && k < 8) {
  console.log(s.slice(Math.max(0, i - 120), i + 40).replace(/\n/g, ' '));
  k++;
}
