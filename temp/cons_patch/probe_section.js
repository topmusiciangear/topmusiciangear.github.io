var fs = require('fs');
var base = 'C:/Users/Daniel/projects/topmusiciangear';
var lines = fs.readFileSync(base + '/build-guides.js', 'utf8').split(/\r?\n/);
for (var i = 1195; i <= 1300; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
