var fs = require('fs');
var path = require('path');
var files = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
var found = [];
files.forEach(function (f) {
  var s = fs.readFileSync(path.join('guides', f), 'utf8');
  var re = /data-store="hollyland"[^>]*class="shop-btn-primary"[\s\S]*?<div class="shop-more-list">[\s\S]*?<\/div>/;
  var m = s.match(re);
  if (m) {
    var stores = [];
    var re2 = /data-store="([^"]+)"/g;
    var x;
    while ((x = re2.exec(m[0])) !== null) stores.push(x[1]);
    found.push(f + ': ' + stores.join(', '));
  }
});
console.log('Hollyland-primary cards with dropdown:', found.length);
found.slice(0, 10).forEach(e => console.log('  ' + e));