const https = require('https');
function fetch(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const n = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, u).href;
        fetch(n).then(resolve); return;
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, html: d }));
    }).on('error', e => resolve({ error: String(e) }));
  });
}
(async () => {
  for (const u of ['https://www.sweetwater.com/store/detail/EVERSE12--electro-voice-everse-12-12-inch-2-way-battery-powered-pa-speaker-black',
    'https://www.gear4music.com/PA-DJ-and-Lighting/Electro-Voice-Everse-12-Battery-Powered-PA-Speaker-Black/653Q']) {
    const r = await fetch(u);
    if (r.error) { console.log(u, 'ERR', r.error); continue; }
    const imgs = [...new Set([...r.html.matchAll(/https:\/\/[^"' ]*sweetwater[^"' ]*products[^"' ]*|https:\/\/[^"' ]*gear4music[^"' ]*preview[^"' ]*/g)].map(m => m[0]))].slice(0, 4);
    console.log(u, 'status:', r.status);
    console.log('  imgs:', JSON.stringify(imgs));
  }
})();
