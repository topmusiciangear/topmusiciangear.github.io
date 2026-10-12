var fs = require('fs');
var s = fs.readFileSync('js/shop-buttons.js', 'utf8');
var i = s.indexOf('ipinfo.io');
console.log(JSON.stringify(s.slice(Math.max(0, i - 100), i + 600)));
console.log('====GEN====');
var g = fs.readFileSync('temp/gen-shop-buttons.js', 'utf8');
console.log('gen has ipinfo: ' + (g.indexOf('ipinfo') >= 0) + ', tmgGeoSwap: ' + (g.indexOf('tmgGeoSwap') >= 0));
