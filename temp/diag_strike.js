var fs = require('fs');
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
var urls = [
  'https://www.andertons.co.uk/fender-cd60s-solid-top-dreadnought-guitar-natural-with-walnut-fingerboard/',
  'https://www.andertons.co.uk/jbl-305p-mkii-5-studio-monitor/'
];
(async function () {
  for (var u of urls) {
    var r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } });
    var html = await r.text();
    console.log('== status=' + r.status + ' len=' + html.length);
    var re = /line-through[^>]*>\s*£?\s*([\d,]+(?:\.\d+)?)/g, m, n = 0;
    while ((m = re.exec(html)) && n < 3) { console.log('  strike: ' + m[1]); n++; }
    if (!n) console.log('  NO strike');
    var pdp = html.match(/data-testid="pdp-price"[^>]*>\s*([^<]{0,40})/);
    console.log('  pdp-price: ' + (pdp ? JSON.stringify(pdp[1]) : 'none'));
  }
})();
