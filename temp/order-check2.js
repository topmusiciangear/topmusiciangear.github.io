var fs = require('fs');
var s = fs.readFileSync('guides/best-interface.html', 'utf8');
var i = s.indexOf('shop-more-list');
while (i >= 0) {
  i = s.indexOf('>', i);
  var end = s.indexOf('</div>', i);
  var inner = s.slice(i + 1, end);
  if (inner.indexOf('data-store=') >= 0) {
    var stores = [];
    var re = /data-store="([^"]+)"/g;
    var m;
    while ((m = re.exec(inner)) !== null) stores.push(m[1]);
    console.log('dropdown:', stores.join(', '));
    break;
  }
  i = s.indexOf('shop-more-list', i + 1);
}