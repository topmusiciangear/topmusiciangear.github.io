var https = require('https');
var urls = [
  'https://m.media-amazon.com/images/I/512MSzrXy6L._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/512MSzrXy6L.__AC_SX300_SY300_QL70_ML2_.jpg'
];
urls.forEach(function(url) {
  https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, function(res) {
    console.log(url.substring(0,60), '->', res.statusCode, res.headers['content-type']);
    res.destroy();
  }).on('error', function(e) { console.log(url.substring(0,60), 'ERROR:', e.message); });
});
