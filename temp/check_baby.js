var fs = require('fs');
var UA = 'Mozilla/5.0 (Windows NT 10.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
fetch('https://www.andertons.co.uk/rme-babyface-pro-fs-24-channel-192-khz-bus-powered-pro-usb-20-audio-interface/', { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } }).then(async function (r) {
  var html = await r.text();
  console.log('status: ' + r.status + ' len: ' + html.length);
  fs.writeFileSync('temp/babyface.html', html);
  var keys = ['is_on_offer', 'str_strike_through_price', 'was-price', 'was_price', '"was"', 'rrp', 'RRP', 'Save £', 'save', 'offer', '715', '629'];
  keys.forEach(function (k) {
    var n = html.split(k).length - 1;
    if (n) console.log(k + ': ' + n);
  });
}).catch(function (e) { console.log('ERR ' + e.message); });
