var fs = require('fs');
['guides/wireless-lapel-mics.html', 'guides/wireless-lapel-mics_es.html', 'guides/rode-wireless-pro-vs-dji-mic-2.html', 'guides/rode-wireless-pro-vs-dji-mic-2_es.html'].forEach(function (f) {
  var t = fs.readFileSync(f, 'utf8');
  var re = /href="[^"]+"/g, m, hit = [];
  while ((m = re.exec(t))) { var h = m[0]; if (/REC0017228|REC0017234/.test(h)) hit.push(h); }
  var aff = hit.filter(function (h) { return h.indexOf('awin1.com') >= 0; }).length;
  var plain = hit.filter(function (h) { return h.indexOf('awin1.com') < 0; });
  console.log('== ' + f + ' | total=' + hit.length + ' awin=' + aff + ' plain=' + plain.length);
  plain.slice(0, 10).forEach(function (h) { console.log('   PLAIN: ' + h); });
  console.log('');
});