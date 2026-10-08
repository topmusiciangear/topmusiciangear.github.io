const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'guitar-bass-amps');
const s = JSON.stringify(d);
let i = -1;
while ((i = s.indexOf('Rumble 200', i + 1)) >= 0) {
  console.log(s.slice(Math.max(0, i - 160), i + 60).replace(/\n/g, ' '));
  console.log('---');
  break;
}
