const https = require('https');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
https.get('https://www.thomannmusic.com/audio_technica_at_875_r.htm', { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } }, r => {
  let d = '';
  r.setEncoding('utf8');
  r.on('data', c => d += c);
  r.on('end', () => {
    console.log('status', r.statusCode, 'len', d.length);
    const re = /https?:\/\/[^"'\\\s]+\.(?:jpg|jpeg|png|webp)[^"'\\\s]*/g;
    let m, seen = new Set(), n = 0;
    while ((m = re.exec(d)) && n < 30) {
      const u = m[0];
      if (seen.has(u)) continue;
      seen.add(u);
      if (/logo|icon|flag|sprite|pixel/i.test(u)) continue;
      if (!/208654|AT.?875|875/i.test(u)) continue;
      console.log(u);
      n++;
    }
    console.log('---- total img urls que contienen 875:', n);
  });
});
