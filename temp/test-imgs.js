var https = require('https');
var urls = [
  ['AT full res PNG', 'https://www.audio-technica.com/media/catalog/product/a/t/at875r_01.png'],
  ['AT large cache PNG', 'https://www.audio-technica.com/media/catalog/product/cache/6620f7d073312f517058019dc9323ce6/a/t/at875r_01.png'],
  ['B&H 2500x2500 JPG', 'https://www.bhphotovideo.com/images/images2500x2500/Audio_Technica_AT875R_AT875_Short_Condenser_Shotgun_495302.jpg'],
  ['B&H scaled 500', 'https://www.bhphotovideo.com/cdn-cgi/image/fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/Audio_Technica_AT875R_AT875_Short_Condenser_Shotgun_1502792755_495302.jpg'],
  ['Thomann', 'https://image Thomann.de pic/orig/at875r_01.jpg'],
  ['Amazon hi', 'https://m.media-amazon.com/images/I/512MSzrXy6L._AC_SL1500_.jpg']
];
var done = 0;
urls.forEach(function(item) {
  var name = item[0], url = item[1];
  https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, function(res) {
    // Follow redirects
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      https.get(res.headers.location, {headers: {'User-Agent': 'Mozilla/5.0'}}, function(res2) {
        console.log(name, '->', res2.statusCode, res2.headers['content-type'], 'size:', res2.headers['content-length']);
        res2.destroy();
        if (++done === urls.length) process.exit();
      });
      return;
    }
    console.log(name, '->', res.statusCode, res.headers['content-type'], 'size:', res.headers['content-length']);
    res.destroy();
    if (++done === urls.length) process.exit();
  }).on('error', function(e) {
    console.log(name, 'ERROR:', e.message);
    if (++done === urls.length) process.exit();
  });
});
