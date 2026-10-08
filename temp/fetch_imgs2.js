const https = require('https');
function fetch(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, u).href;
        fetch(next).then(resolve);
        return;
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ u, status: res.statusCode, html: d }));
    }).on('error', e => resolve({ u, error: String(e) }));
  });
}
(async () => {
  const urls = [
    'https://www.andertons.co.uk/brands/yamaha/yamaha-seqtrak-music-production-studio-black',
    'https://www.andertons.co.uk/akai-mpc-x-se-standalone-music-production-centre/'
  ];
  for (const u of urls) {
    const r = await fetch(u);
    console.log('URL:', u, 'status:', r.status, 'len:', r.html.length);
    const og = r.html.match(/og:image[^>]*content="([^"]+)"/);
    console.log('  og:image:', og ? og[1] : 'none');
    const cdn = [...new Set([...r.html.matchAll(/https:\/\/cdn11[^"' ]+products\/\d+\/\d+\/[^"' ]+\.jpg[^"' ]*/g)].map(m => m[0]))].slice(0, 4);
    console.log('  cdn imgs:', JSON.stringify(cdn, null, 0));
    const pm = r.html.match(/&pound;([\d,]+\.\d{2})|£([\d,]+\.\d{2})/);
    console.log('  first price:', pm ? (pm[1] || pm[2]) : 'none');
  }
})();
