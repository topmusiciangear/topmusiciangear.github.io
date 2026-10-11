var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
var urls = [
  'https://www.andertons.co.uk/prs-se-p20e-tonare-parlour-electro-acoustic-guitar-gloss-black/',
  'https://www.andertons.co.uk/behringer-x-touch-one-universal-control-surface/',
  'https://www.andertons.co.uk/behringer-umc1820-usb-audio-interface/'
];
(async function () {
  for (var u of urls) {
    try {
      var r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } });
      var html = await r.text();
      console.log('== ' + u + ' status=' + r.status);
      var tit = html.match(/<title>([^<]*)/);
      console.log('  title: ' + (tit && tit[1].slice(0, 80)));
      var re = /line-through[^>]*>\s*£?\s*([\d,]+(?:\.\d+)?)/g, m, n = 0;
      while ((m = re.exec(html)) && n < 3) {
        console.log('  strike £' + m[1] + ' ctx: ' + JSON.stringify(html.slice(Math.max(0, m.index - 250), m.index + 40)));
        n++;
      }
      if (!n) console.log('  NO strike found');
    } catch (e) { console.log('ERR ' + u + ' ' + e.message); }
  }
})();
