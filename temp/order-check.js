var fs = require('fs');
['guides/best-interface.html', 'guides/best-interface_es.html', 'guides/mixing-plugins.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var list = s.match(/<div class="shop-more-list">([\s\S]*?)<\/div>/);
  if (!list) { console.log(f + ': no dropdown'); return; }
  var stores = [];
  var re = /data-store="([^"]+)"/g;
  var m;
  while ((m = re.exec(list[1])) !== null) stores.push(m[1]);
  console.log(f + ' -> ' + stores.join(', '));
});