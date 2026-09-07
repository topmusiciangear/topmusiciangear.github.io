const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        resolve({ url, status: res.statusCode, location: res.headers.location });
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { data += c; if (data.length > 250000) { data = data.slice(0, 250000); req.destroy(); } });
      res.on('end', () => resolve({ url, status: res.statusCode, data }));
    });
    req.on('error', (e) => resolve({ url, status: 'ERR', err: e.message }));
  });
}

const urls = process.argv.slice(2);
(async () => {
  for (const u of urls) {
    const r = await get(u);
    if (!r.data) { console.log('=== ' + u + ' ==='); console.log(r.status, r.location || r.err || 'no data'); continue; }
    const og = r.data.match(/property="og:image"\s+content="([^"]+)"/);
    const ogTitle = r.data.match(/property="og:title"\s+content="([^"]+)"/);
    const jp = (r.data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
    console.log('=== ' + u + ' ===');
    console.log('status:', r.status);
    if (ogTitle) console.log('og:title:', ogTitle[1]);
    if (og) console.log('og:image:', og[1]);
    const imgs = [...new Set((r.data.match(/https:\/\/r2\.gear4music\.com\/media\/[^"']+/g) || []).map(s => s.split(' ')[0]))];
    if (imgs.length) console.log('r2 imgs:', imgs.slice(0, 8).join(' | '));
    if (jp) {
      const price = jp.match(/"price"\s*:\s*"?([0-9.,]+)/);
      const currency = jp.match(/"priceCurrency"\s*:\s*"([A-Z]+)"/);
      console.log('ld+json price:', price ? price[1] : '?', currency ? currency[1] : '?');
    }
  }
})().catch(e => { console.error(e); process.exit(1); });