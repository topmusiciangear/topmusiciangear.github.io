var https = require('https');
https.get('https://topmusiciangear.com/guides/best-interface.html?cb=' + Date.now(), function (r) {
  var s = '';
  r.on('data', function (c) { s += c; });
  r.on('end', function () {
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
        console.log('LIVE dropdown:', stores.join(', '));
        return;
      }
      i = s.indexOf('shop-more-list', i + 1);
    }
    console.log('no dropdown found');
  });
}).on('error', function (e) { console.error(e.message); });