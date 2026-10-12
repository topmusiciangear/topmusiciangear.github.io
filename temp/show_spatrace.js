var fs = require('fs');
var s = fs.readFileSync('temp/gen-shop-buttons.js', 'utf8');
var i = s.indexOf('function tryTrace');
console.log(JSON.stringify(s.slice(i, i + 900)));
