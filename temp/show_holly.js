var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('SHOP_LOGO_STYLE.hollyland');
console.log(JSON.stringify(s.slice(i - 60, i + 120)));
