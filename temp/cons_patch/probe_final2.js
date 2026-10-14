var fs = require('fs');
var t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8').split(/\r?\n/);
for (var i = 1858; i <= 1877; i++) console.log((i + 1) + '|' + t[i]);
