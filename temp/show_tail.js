var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('var y=new XMLHttpRequest();');
console.log(JSON.stringify(s.slice(i, i + 500)));
