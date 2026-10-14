const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-interface.html', 'utf8');
let i = h.indexOf('pristine');
while (i > -1) {
  console.log('...' + h.slice(Math.max(0, i - 100), i + 60).replace(/\n/g, ' ') + '...');
  i = h.indexOf('pristine', i + 1);
}
// Y en guides.json para esa guia
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-interface');
const all = JSON.stringify(g);
let j = all.indexOf('pristine');
while (j > -1) {
  console.log('JSON: ...' + all.slice(Math.max(0, j - 80), j + 40).replace(/\n/g, ' ') + '...');
  j = all.indexOf('pristine', j + 1);
}