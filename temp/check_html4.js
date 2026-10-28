const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('shop-btn-review');
const sub = c.substring(i, i+320);
// Find the style= part
const si = sub.indexOf('style=');
console.log('style attr:', sub.substring(si, si+200));
