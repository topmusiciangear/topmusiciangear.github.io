var fs = require('fs');
var files = ['guides/apollo-vs-babyface.html', 'guides/wireless-lapel-mics.html', 'guides/beginners-acoustic-guitar-guide.html', 'guides/studio-furniture.html'];
files.forEach(function (f) {
  if (!fs.existsSync(f)) return;
  var t = fs.readFileSync(f, 'utf8');
  var re = /data-store="musicstore" href="([^"]+)"/g, m, hit = [];
  while ((m = re.exec(t))) { hit.push(m[1].length > 150 ? m[1].slice(0, 150) + '...' : m[1]); }
  var awin = hit.filter(function (h) { return h.indexOf('awin1.com') >= 0; }).length;
  console.log('== ' + f + ' | musicstore rows=' + hit.length + ' awin=' + awin);
  hit.slice(0, 3).forEach(function (h) { console.log('    ' + h); });
  console.log('');
});