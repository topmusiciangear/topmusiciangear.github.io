const fs = require('fs');
const h = fs.readFileSync('guides/ai-tools-plugins.html', 'utf8');
let idx = -1;
let n = 0;
while ((idx = h.indexOf('a7f377af19.webp', idx + 1)) > -1) {
  n++;
  console.log('=== occurrence', n, 'at', idx);
  console.log(h.slice(Math.max(0, idx - 700), idx + 700).replace(/\s+/g, ' '));
}
