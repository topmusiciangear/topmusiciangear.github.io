const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
// Find the actual dropdown div (with max-height)
const i = c.indexOf('max-height:0;transition');
const sub = c.substring(Math.max(0,i-80), i+20);
console.log('dropdown:', JSON.stringify(sub));
const hasMargin = sub.includes('margin-top');
console.log('has margin-top:', hasMargin);
