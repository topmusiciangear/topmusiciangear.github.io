var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('Comparar en 5 tiendas');
console.log(s.slice(Math.max(0, i - 1500), i + 300));
