const https = require('https');
const urls = [
  'https://www.andertons.co.uk/brands/yamaha/yamaha-seqtrak-music-production-studio-black',
  'https://www.andertons.co.uk/akai-mpc-x-se-standalone-music-production-centre/',
  'https://www.andertons.co.uk/native-instruments-maschine-plus/',
  'https://sonicware.eu/produkt/liven-lofi-12/'
];
function fetch(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetch(res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, u).href).then(resolve);
        return;
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ u, status: res.statusCode, html: d }));
    }).on('error', e => resolve({ u, error: String(e) }));
  });
}
(async () => {
  for (const u of urls) {
    const r = await fetch(u);
    if (r.error) { console.log('ERR', u, r.error); continue; }
    const og = r.html.match(/<meta property="og:image" content="([^"]+)"/);
    const price = r.html.match(/"price":\s*([0-9.]+)/);
    const cur = r.html.match(/"priceCurrency":\s*"([A-Z]+)"/);
    const avail = r.html.match(/"availability":\s*"https:\/\/schema.org\/(\w+)"/);
    console.log('URL:', u);
    console.log('  status:', r.status);
    console.log('  og:image:', og ? og[1] : 'NOT FOUND');
    console.log('  price:', price ? price[1] : '?', cur ? cur[1] : '', avail ? avail[1] : '');
  }
})();
