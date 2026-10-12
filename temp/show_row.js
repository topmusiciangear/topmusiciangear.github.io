var fs = require('fs');
var s = fs.readFileSync('guides/best-plugins.html', 'utf8');
var key = 'data-store="gear4music"';
var i = s.indexOf(key);
console.log(JSON.stringify(s.slice(i + 500, i + 800)));
