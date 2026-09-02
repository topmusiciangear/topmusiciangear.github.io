var fs = require('fs');
var h = fs.readFileSync('guides/mixing-plugins_es.html', 'utf8');
var re = /href="([^"]*musicstore[^"]*)"/g;
var m;
var count = 0;
var withAff = 0;
var missing = [];
while (m = re.exec(h)) {
  count++;
  var has = m[1].indexOf('awin1.com') >= 0;
  if (has) withAff++;
  if (!has && missing.length < 5) missing.push(m[1].substring(0, 150));
}
console.log('MusicStore links: ' + withAff + '/' + count + ' with Awin affiliate');
if (missing.length > 0) {
  console.log('\nMISSING AFFILIATE:');
  missing.forEach(function(u) { console.log('  ' + u); });
}
