const https = require('https');
const urls = process.argv.slice(2);
function get(u) {
  return new Promise((res) => {
    https.get(u, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9'
      }
    }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        const m = d.match(/og:image[^>]*content="([^"]+)"/);
        console.log(r.statusCode, u, '=>', m ? m[1] : ('NO-OG len=' + d.length));
        res();
      });
    }).on('error', e => { console.log('ERR', u, e.message); res(); });
  });
}
(async () => { for (const u of urls) await get(u); })();
