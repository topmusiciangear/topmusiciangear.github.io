const https = require('https');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const url = process.argv[2];
https.get(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'en-US,en;q=0.9' } }, r => {
  let d = '';
  r.setEncoding('utf8');
  r.on('data', c => d += c);
  r.on('end', () => {
    console.log('status', r.statusCode, 'len', d.length);
    const re = /https?:\/\/[^"'\\\s]*media-amazon[^"'\\\s]*/g;
    let m, seen = new Set(), n = 0;
    while ((m = re.exec(d)) && n < 25) {
      const u = m[0];
      if (seen.has(u)) continue;
      seen.add(u);
      if (!/\.(jpg|png|webp)/i.test(u)) continue;
      if (/sprite|logo|icon|pixel/i.test(u)) continue;
      console.log(u);
      n++;
    }
    if (!n) {
      const m2 = d.match(/hiRes[^,]{0,200}/);
      console.log('hiRes?', m2 && m2[0]);
      const t = d.match(/<title>([^<]*)<\/title>/);
      console.log('title:', t && t[1]);
    }
  });
});
