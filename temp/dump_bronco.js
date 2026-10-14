const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
let i = h.indexOf('SQU0373800');
console.log(h.slice(Math.max(0, i - 1400), i + 200).replace(/></g, '>\n<'));