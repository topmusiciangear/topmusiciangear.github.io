var fs = require('fs');
var t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8').split(/\r?\n/);
for (var i = 1862; i <= 1896; i++) console.log((i + 1) + ': ' + t[i]);
