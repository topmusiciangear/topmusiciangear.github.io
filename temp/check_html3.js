const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('shop-btn-review');
const sub = c.substring(i, i+260);
const styleStart = sub.indexOf('style="');
const styleEnd = sub.indexOf('"', styleStart+7);
console.log(JSON.stringify(sub.substring(styleStart, styleEnd+1)));
