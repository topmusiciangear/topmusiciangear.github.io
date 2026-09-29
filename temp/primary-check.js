var fs = require('fs');
['guides/best-interface.html', 'guides/best-interface_es.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var re = /<a[^>]*data-store="amazon"[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g;
  var m;
  var n = 0;
  console.log('== ' + f);
  while ((m = re.exec(s)) !== null) {
    n++;
    var text = m[0].replace(/\s+/g, ' ').slice(0, 260);
    if (n <= 3) console.log('   ' + text);
  }
  console.log('   primary Amazon buttons:', n);
});