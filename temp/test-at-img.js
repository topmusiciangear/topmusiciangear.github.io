var https = require('https');
var url = 'https://www.audio-technica.com/media/catalog/product/cache/177161fc218aa2dd413f2b73f6832b88/a/t/at875r_01.png';
var options = {
  headers: {
    'Referer': 'https://topmusiciangear.github.io/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};
https.get(url, options, function(res) {
  console.log('Status:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length']);
  console.log('Access-Control-Allow-Origin:', res.headers['access-control-allow-origin']);
}).on('error', function(e) {
  console.log('Error:', e.message);
});
