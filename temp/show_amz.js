var fs = require('fs');
var s = fs.readFileSync('guides/best-monitors_es.html', 'utf8');
var key = 'data-store="amazon"';
var i = s.indexOf(key);
var seg = s.slice(i, i + 2200);
var j = seg.indexOf('Comprar en');
console.log(JSON.stringify(seg.slice(j - 60, j + 700)));
