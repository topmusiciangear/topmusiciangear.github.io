var fs = require('fs');
var h = fs.readFileSync('guides/sidechain-modulation-plugins_es.html', 'utf8');
var re = /pluginboutique\.com\/product[^"'\s]*/g;
var m;
var count = 0;
var withAff = 0;
while (m = re.exec(h)) {
  count++;
  var url = m[0];
  var hasAid = url.indexOf('a_aid=') >= 0;
  if (hasAid) withAff++;
  console.log((hasAid ? 'OK' : 'MISSING') + ' | ' + url.substring(0, 100));
}
console.log('\nTotal PB links: ' + count + ', With affiliate: ' + withAff);
