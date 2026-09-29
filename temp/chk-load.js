var fs = require('fs');
var files = fs.readdirSync('.').filter(function (f) { return /\.html$/.test(f); })
  .concat(fs.readdirSync('es').map(function (f) { return 'es/' + f; }));
var use = {};
files.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var m = s.match(/<script[^>]+src="([^"]*(?:translations|t\.min)[^"]*)"/g) || [];
  m.forEach(function (x) {
    var src = x.replace(/^.*src="([^"]*)".*$/, '$1');
    use[src] = (use[src] || 0) + 1;
  });
});
Object.keys(use).forEach(function (k) { console.log(use[k], k); });