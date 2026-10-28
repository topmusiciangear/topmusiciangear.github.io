const fs = require('fs');
const c = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html','utf8');
const count = (c.match(/margin-top:8px/g) || []).length;
console.log('margin-top:8px count in HTML:', count);
// Check for any margin-top on review button area
const i = c.indexOf('shop-btn-review');
const sub = c.substring(Math.max(0,i-20), i+30);
console.log('context:', JSON.stringify(sub));
