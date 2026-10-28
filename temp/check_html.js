const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('shop-btn-review');
const sub = c.substring(i-30, i+5);
console.log(JSON.stringify(sub));
