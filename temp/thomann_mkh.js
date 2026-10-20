const https = require('https');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const url = 'https://www.thomannmusic.com/search_dir.html?sw=' + encodeURIComponent('Sennheiser MKH 50');

https.get(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } }, r => {
  if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
    console.log('redirect ->', r.headers.location);
  }
  let d = '';
  r.setEncoding('utf8');
  r.on('data', c => d += c);
  r.on('end', () => {
    console.log('status', r.statusCode, 'len', d.length);
    // bloques de producto: buscar enlaces con titulo y su imagen cercana
    const re = /MKH\s*50[^<>"]{0,40}/gi;
    let m, n = 0;
    while ((m = re.exec(d)) && n < 8) {
      console.log('...' + d.slice(Math.max(0, m.index - 120), m.index + 60).replace(/\s+/g, ' '));
      n++;
    }
    const imgs = [...new Set((d.match(/https:\/\/thumbs\.static-thomann\.de\/thumb\/[^"'\s]+\.(?:jpg|webp)/g) || []))];
    console.log('imgs:', imgs.length);
    imgs.slice(0, 12).forEach(u => console.log('  ' + u));
  });
});
