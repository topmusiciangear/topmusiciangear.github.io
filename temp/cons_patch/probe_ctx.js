var fs = require('fs');
var base = 'C:/Users/Daniel/projects/topmusiciangear';
['guides/premium-interfaces.html', 'guides/premium-interfaces_es.html'].forEach(function(p){
  var t = fs.readFileSync(base + '/' + p, 'utf8');
  console.log('==== ' + p + ' (' + t.length + ' bytes) ====');
  var idx = 0, n = 0;
  while ((idx = t.indexOf('undefined', idx)) >= 0) {
    n++;
    console.log('  [' + n + '] ctx=' + JSON.stringify(t.slice(Math.max(0, idx - 75), idx + 45)));
    idx += 9;
  }
  console.log('  total undefined=' + n);
});
