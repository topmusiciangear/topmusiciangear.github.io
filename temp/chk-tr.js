var fs = require('fs');
['index.html', 'es/index.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var m = s.match(/<script[^>]+src="([^"]*translations[^"]*|[^"]*t\.min\.js)"/g);
  console.log('--- ' + f + ' ---');
  (m || []).forEach(function (x) { console.log(x); });
});