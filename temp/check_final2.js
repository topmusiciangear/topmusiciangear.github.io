const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
// Find the actual dropdown div (with max-height)
const i = c.indexOf('max-height:0;transition');
const sub = c.substring(Math.max(0,i-100), i+20);
console.log('dropdown:', JSON.stringify(sub));
console.log('has margin-top:', sub.includes('margin-top'));
// Check review button
const j = c.indexOf('shop-btn-review');
const sub2 = c.substring(j-10, j+200);
const si = sub2.indexOf('style=');
const q1 = sub2.indexOf('"', si);
const q2 = sub2.indexOf('"', q1+1);
console.log('review style end:', JSON.stringify(sub2.substring(q1+1, q2).slice(-40)));
console.log('review has margin-top:', sub2.substring(q1+1, q2).includes('margin-top'));
