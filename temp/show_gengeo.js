var fs = require('fs');
var f = 'temp/gen-shop-buttons.js';
var s = fs.readFileSync(f, 'utf8');
var i = s.indexOf("y.open('GET', 'https://ipinfo.io/json'");
console.log(JSON.stringify(s.slice(i - 50, i + 600)));
