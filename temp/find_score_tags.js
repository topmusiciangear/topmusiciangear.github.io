const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
for (const s of ['>9.8<', '>9.6<', '>9.5<', '>9.4<', '>9.3<']) {
  let idx = h.indexOf(s);
  let n = 0;
  while (idx > -1 && n < 3) {
    console.log(s + ' ctx: ' + h.slice(Math.max(0, idx - 220), idx + 6).replace(/\s+/g, ' '));
    console.log('');
    idx = h.indexOf(s, idx + 1); n++;
  }
}
