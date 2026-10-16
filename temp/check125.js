const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/repitch-vs-melodyne.html', 'utf8');
let idx = -1, n = 0;
while ((idx = h.indexOf('125', idx + 1)) > -1 && n < 12) {
  n++;
  console.log(n + ': ' + JSON.stringify(h.slice(Math.max(0, idx - 80), idx + 30)));
}
