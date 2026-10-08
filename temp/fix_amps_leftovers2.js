const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'guitar-bass-amps');
const rb = d.verdictProsCons.find(v => v.name === 'Ampeg Rocket Bass RB-115');
rb.cons = rb.cons.map(c => /Rumble 200/.test(c) ? '100W standalone until extension cab unlocks 200W' : c);
// any other stray refs in the whole guide?
const s = JSON.stringify(d);
['RB-210', 'Rumble 200', 'Spark LIVE'].forEach(n => {
  let i = -1, k = 0;
  while ((i = s.indexOf(n, i + 1)) >= 0 && k < 3) {
    console.log('LEFT ' + n + ':', s.slice(Math.max(0, i - 100), i + 60).replace(/\n/g, ' '));
    k++;
  }
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('patched');
