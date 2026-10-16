const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let idx = -1, n = 0;
while ((idx = bg.indexOf('1037:', idx + 1)) > -1) {
  n++;
  console.log('--- ocurrencia ' + n + ': ' + JSON.stringify(bg.slice(idx, idx + 220)));
}
console.log('total: ' + n);
