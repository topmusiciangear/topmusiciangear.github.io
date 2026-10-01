const fs = require('fs');
const h = fs.readFileSync('guides/mics-for-creators.html', 'utf8');
let i = -1, n = 0;
while ((i = h.indexOf('AT2040USB', i + 1)) >= 0 && n < 8) {
  n++;
  console.log(n + ' @' + i + ': ' + JSON.stringify(h.slice(Math.max(0, i - 60), i + 60)));
}
