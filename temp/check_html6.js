const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('shop-btn-review');
// Find the style= attribute for this button
const styleIdx = c.indexOf('style=', i);
const quoteStart = c.indexOf('"', styleIdx);
const quoteEnd = c.indexOf('"', quoteStart+1);
const style = c.substring(quoteStart+1, quoteEnd);
console.log('HAS margin-top:', style.includes('margin-top'));
console.log('style contains:', style.substring(style.length-60));
