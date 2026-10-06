const https = require('https');
const pages = [
  ['565', 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-RP107-Digital-Piano/50G2'],
  ['566', 'https://www.gear4music.ie/Keyboards-and-Pianos/Korg-B2SP-Digital-Piano-With-Stand-Black-Ex-Demo/69US'],
  ['566b', 'https://www.gear4music.com/us/en/Keyboards-and-Pianos/Korg-B2SP-Digital-Piano-Package-Black/63AU'],
  ['567', 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-166-Digital-Piano-Black/86RE'],
  ['568', 'https://www.gear4music.com/Keyboards-and-Pianos/Kawai-KDP120-Digital-Piano-Package-Satin-Black/64V5'],
  ['569', 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-HP704-Digital-Piano-Charcoal-Black/2Y1K'],
  ['570', 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CLP-835-Digital-Piano-Satin-Black/6GTG'],
  ['571', 'https://www.gear4music.ie/Keyboards-and-Pianos/Casio-PX-S1100-Digital-Piano-Black/42WH'],
  ['572', 'https://www.gear4music.com/us/en/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano-Black/2U9X']
];
function fetch(target) {
  return new Promise(res => {
    https.get('https://r.jina.ai/' + target, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(d));
    }).on('error', e => res('ERR ' + e.message));
  });
}
(async () => {
  for (const [id, url] of pages) {
    const d = await fetch(url);
    console.log('=== ' + id);
    const re = /[^\n(\[]*\[?[^\]\n]*r2\.gear4music\.com\/media\/\d+\/\d+\/1200\/preview[^ )"'\]]*/g;
    // simpler: find all occurrences and print 160 chars around
    let idx = 0, count = 0;
    while ((idx = d.indexOf('/1200/preview', idx)) !== -1 && count < 4) {
      const s = Math.max(0, idx - 220);
      console.log('   ...' + d.slice(s, idx + 30).replace(/\s+/g, ' '));
      idx += 10; count++;
    }
  }
})();
