var https = require('https');
function get(u) {
  return new Promise(function (res, rej) {
    https.get(u + '?cb=' + Date.now(), function (r) {
      var s = '';
      r.on('data', function (c) { s += c; });
      r.on('end', function () { res({ u: u, s: s }); });
    }).on('error', rej);
  });
}
['https://topmusiciangear.com/deals.html', 'https://topmusiciangear.com/deals_es.html'].forEach(function (u) {
  get(u).then(function (o) {
    var re = /<a[^>]*data-store="reverb"[^>]*>[\s\S]*?<\/a>/g;
    var m, n = 0, prices = 0, labels = 0;
    var label = o.u.indexOf('_es') > -1 ? 'Verificar precio' : 'Check price';
    while ((m = re.exec(o.s)) !== null) {
      n++;
      if (/[$£€]\s?[0-9]/.test(m[0])) prices++;
      if (m[0].indexOf(label) > -1) labels++;
    }
    console.log(o.u + ' reverbButtons=' + n + ' withPrice=' + prices + ' withLabel=' + labels);
  }).catch(function (e) { console.error(o && o.u, e.message); });
});