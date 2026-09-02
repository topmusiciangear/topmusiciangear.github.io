var fs = require('fs');
var h = fs.readFileSync('guides/sidechain-modulation-plugins_es.html', 'utf8');
// Find ALL pluginboutique URLs in href attributes
var re = /href="(https:\/\/www\.pluginboutique\.com[^"]+)"/g;
var m;
while (m = re.exec(h)) {
  var url = m[1];
  var hasAid = url.indexOf('a_aid=') >= 0;
  console.log((hasAid ? 'OK' : 'MISSING') + ' | ' + url);
}
