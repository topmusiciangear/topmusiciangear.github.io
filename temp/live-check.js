var https = require('https');
var urls = [
  'https://topmusiciangear.com/guides/best-interface.html',
  'https://topmusiciangear.com/guides/best-interface_es.html'
];
function get(url) {
  return new Promise(function (res, rej) {
    https.get(url + (url.indexOf('?') > -1 ? '&' : '?') + 'cb=' + Date.now(), function (r) {
      var data = '';
      r.on('data', function (c) { data += c; });
      r.on('end', function () { res({ url: url, status: r.statusCode, body: data }); });
    }).on('error', rej);
  });
}
Promise.all(urls.map(get)).then(function (rs) {
  rs.forEach(function (r) {
    var s = r.body;
    var amz = s.match(/<a[^>]*data-store="amazon"[^>]*>[\s\S]*?<\/a>/g) || [];
    var withPrice = amz.filter(function (a) { return /[$£€]\s?[0-9]/.test(a); }).length;
    var label = r.url.indexOf('_es') > -1 ? 'Verificar precio' : 'Check price';
    var withLabel = amz.filter(function (a) { return a.indexOf(label) > -1; }).length;
    var withAmazonShop = s.indexOf('shop-btn-primary') > -1;
    console.log(r.url + ' status=' + r.status + ' amazonButtons=' + amz.length + ' withPrice=' + withPrice + ' withLabel(' + label + ')=' + withLabel + ' hasButtons=' + withAmazonShop);
  });
}).catch(function (e) { console.error(e.message); });