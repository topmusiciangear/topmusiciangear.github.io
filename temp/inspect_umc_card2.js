const fs = require('fs');
const h = fs.readFileSync('guides/budget-interfaces.html', 'utf8');
let i = -1, n = 0;
while ((i = h.indexOf('UMC1820', i + 1)) > -1 && n < 12) {
  n++;
  console.log('--- #' + n + ' at ' + i + ': ' + h.slice(Math.max(0, i - 120), i + 120).replace(/\s+/g, ' '));
}