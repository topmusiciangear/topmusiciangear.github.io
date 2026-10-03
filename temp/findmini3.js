const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
let i = -1, n = 0;
while ((i = h.indexOf('Spark MINI', i + 1)) > -1 && n < 20) {
  n++;
  console.log('#' + n + ' @' + i + ': ' + h.slice(Math.max(0, i - 100), i + 100).replace(/\s+/g, ' '));
}