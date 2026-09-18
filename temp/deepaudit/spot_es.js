const https = require('https');
function get(u, hops) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops < 5) {
        const next = new URL(res.headers.location, u).href.replace(/^http:/, 'https:');
        return resolve(get(next, hops + 1));
      }
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve({ status: res.statusCode, url: u, body: d }));
    }).on('error', (e) => resolve({ status: 0, url: u, body: String(e) }));
  });
}
(async () => {
  for (const p of ['guides/studio-furniture.html', 'guides/studio-furniture_es.html']) {
    const r = await get('https://topmusiciangear.github.io/' + p, 0);
    const bad = ['\u00a3899.00', '\u20ac999.00', '\u20ac539.00', '\u20ac168.00', '\u20ac209.00', '\u00a3589.00'].filter((x) => r.body.indexOf(x) >= 0);
    const good = ['Squarewave-4-Pack%2F5KYU', '\u00a344.99', '$65.95', '\u20ac52.00', '\u20ac78.00', '\u20ac49.00', '\u20ac17.90'].filter((x) => r.body.indexOf(x) >= 0);
    console.log(p, 'status', r.status, 'bytes', r.body.length);
    console.log('  good:', good.length ? good.join(' | ') : 'NONE');
    console.log('  absurd left:', bad.length ? JSON.stringify(bad) : 'NONE');
  }
})();