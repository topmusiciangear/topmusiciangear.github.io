const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const j = c.indexOf('shop-btn-review');
const sub2 = c.substring(j, j+300);
// Find style= more carefully
const si = sub2.indexOf('style="');
const q1 = si + 7; // after style="
const q2 = sub2.indexOf('"', q1);
const style = sub2.substring(q1, q2);
console.log('review style:', style);
console.log('has margin-top:', style.includes('margin-top'));
