const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('style.min.css');
console.log(c.substring(i, i+40));
