const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const j = c.indexOf('shop-btn-review');
const sub2 = c.substring(j, j+350);
// Find all style= occurrences
let pos = 0;
while (true) {
  const si = sub2.indexOf('style="', pos);
  if (si === -1) break;
  const q1 = si + 7;
  const q2 = sub2.indexOf('"', q1);
  const style = sub2.substring(q1, q2);
  console.log('style found:', style.substring(0, 60) + '...' + style.slice(-40));
  console.log('  has margin-top:', style.includes('margin-top'));
  pos = q2 + 1;
}
