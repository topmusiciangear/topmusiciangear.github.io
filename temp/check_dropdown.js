const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const i = c.indexOf('shop-more-list');
const sub = c.substring(i, i+120);
console.log('dropdown style:', sub.substring(0, 100));
const hasMargin = sub.includes('margin-top');
console.log('dropdown has margin-top:', hasMargin);
