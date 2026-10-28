const fs = require('fs');
const c = fs.readFileSync('css/style.css','utf8');
const i = c.indexOf('guide-product-card-stores');
console.log(c.substring(i, i+200));
