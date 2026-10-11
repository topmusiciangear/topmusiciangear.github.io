var fs = require('fs');
['deals.html', 'deals_es.html'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  // 1. no double wrap: anrdoezrs URL must not contain another anrdoezrs inside its ?url=
  var dbl = 0, i = -1;
  while ((i = s.indexOf('anrdoezrs.net/click', i + 1)) >= 0) {
    var seg = s.slice(i, i + 220);
    if (seg.indexOf('anrdoezrs.net%2Fclick') >= 0 || seg.slice(60).indexOf('anrdoezrs.net/click') >= 0) dbl++;
  }
  // 2. no legacy prefix survives (encoded %2Fa--925521 or plain)
  var legacy = s.split('a--925521').length - 1;
  // 3. sample a zz href decodes to a clean item page
  var m = s.match(/anrdoezrs\.net\/click-101857888-10439229\?url=([^"']+)/);
  console.log(f + ' doublewrap=' + dbl + ' legacy=' + legacy);
  if (m) console.log('  sample -> ' + decodeURIComponent(m[1]).slice(0, 90));
});
