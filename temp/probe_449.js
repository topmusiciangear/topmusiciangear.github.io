const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
let i = -1;
while ((i = h.indexOf('449.99', i + 1)) >= 0) {
  console.log('--- at', i, '---');
  console.log(h.slice(Math.max(0, i - 400), i + 200));
}
console.log('### 284 search:', (h.match(/284/g) || []).length);
