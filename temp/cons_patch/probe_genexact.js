var fs = require('fs');
var lines = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8').split(/\r?\n/);
for (var i = 1862; i <= 1876; i++) {
  console.log((i + 1) + '|' + JSON.stringify(lines[i]));
}
