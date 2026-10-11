var fs = require('fs');
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
fetch('https://www.andertons.co.uk/fender-cd60s-solid-top-dreadnought-guitar-natural-with-walnut-fingerboard/', { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } }).then(async function (r) {
  var html = await r.text();
  console.log('status: ' + r.status + ' len: ' + html.length);
  fs.writeFileSync('temp/cd60s.html', html);
  ['strike', 'was-price', 'price-was', 'rrp', 'RRP', 'Save £', 'save-', 'wasPrice', 'was_price', 'list-price', 'compare-at', '189', '179'].forEach(function (k) {
    console.log(k + ': ' + (html.split(k).length - 1));
  });
}).catch(function (e) { console.log('ERR ' + e.message); });
