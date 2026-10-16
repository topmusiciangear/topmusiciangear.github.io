const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'autotune-vs-melodyne');
console.log(JSON.stringify(g, null, 1).slice(0, 12000));
// linker context
const v = guides.find(x => x.id === 'vocalign-vs-revoice-pro');
const s = JSON.stringify(v);
let i = s.indexOf('autotune-vs-melodyne');
while (i > -1) {
  console.log('LINKER CTX: ...' + s.slice(Math.max(0, i - 150), i + 60) + '...');
  i = s.indexOf('autotune-vs-melodyne', i + 1);
}
