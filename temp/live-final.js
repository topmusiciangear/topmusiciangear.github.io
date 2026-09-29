var https = require('https');
var urls = [
  'https://topmusiciangear.com/guides/wireless-lapel-mics.html',
  'https://topmusiciangear.com/guides/wireless-lapel-mics_es.html',
  'https://topmusiciangear.com/guides/best-interface.html'
];
function get(u) {
  return new Promise(function (res, rej) {
    https.get(u + '?nocache=' + Date.now(), function (r) {
      var s = '';
      r.on('data', function (c) { s += c; });
      r.on('end', function () {
        var amz = (s.match(/<a[^>]*data-store="amazon"[^>]*>[\s\S]*?<\/a>/g) || []);
        var rev = (s.match(/<a[^>]*data-store="reverb"[^>]*>[\s\S]*?<\/a>/g) || []);
        function stat(arr, lab, f) {
          return arr.filter(f).length + '/' + arr.length;
        }
        console.log(u.split('/').pop() + '  amazon[check=' + stat(amz, 0, function (a) { return a.indexOf('Check price') > -1 || a.indexOf('Verificar precio') > -1; }) + ', price=' + stat(amz, 0, function (a) { return /[$£€]\s?[0-9]/.test(a); }) + ']  reverb[check=' + stat(rev, 0, function (a) { return a.indexOf('Check price') > -1 || a.indexOf('Verificar precio') > -1; }) + ', price=' + stat(rev, 0, function (a) { return /[$£€]\s?[0-9]/.test(a); }) + ']');
      });
    }).on('error', rej);
  });
}
Promise.all(urls.map(get)).catch(function (e) { console.error(e.message); });