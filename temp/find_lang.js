const fs = require('fs');
const h = fs.readFileSync('index.html','utf8');
const i = h.indexOf('class="lang-switcher"');
console.log(h.slice(Math.max(0,i-60), i+260));