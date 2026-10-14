var fs = require('fs');
var base = 'C:/Users/Daniel/projects/topmusiciangear';
var t = fs.readFileSync(base + '/build-guides.js', 'utf8').split(/\r?\n/);
for (var i = 0; i < Math.min(140, t.length); i++) {
  console.log((i + 1) + ': ' + t[i]);
}
var gt = t.join('\n');
var m = gt.match(/process\.argv[^\n]*/g);
console.log('--- argv refs ---');
if (m) m.forEach(function(x){ console.log(x); }); else console.log('none');
var m2 = gt.match(/^.*(argv|--guide|--only|filter|slice|ids\b)[^\n]*$/m);
