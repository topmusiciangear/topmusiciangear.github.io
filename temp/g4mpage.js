const https = require('https');
const pages = [
  ['565', 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-RP107-Digital-Piano/50G2'],
  ['566', 'https://www.gear4music.com/Keyboards-and-Pianos/Korg-B2SP-Digital-Piano-With-Stand-Black/30O1'],
  ['567', 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-166-Digital-Piano-Black/86RE'],
  ['568', 'https://www.gear4music.com/Keyboards-and-Pianos/Kawai-KDP120-Digital-Piano-Package-Satin-Black/64V5'],
  ['569', 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-HP704-Digital-Piano-Charcoal-Black/2Y1K'],
  ['570', 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CLP-835-Digital-Piano-Satin-Black/6GTG'],
  ['571', 'https://www.gear4music.com/Keyboards-and-Pianos/Casio-Privia-PX-S1100-Digital-Piano-Black/42WH'],
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
    const h1 = (d.match(/^# (.+)$/m) || ['', '?'])[1];
    const price = (d.match(/[£€$]\s?[\d,]+(\.\d{2})?\s*Price Includes VAT/) || ['no-price'])[0];
    const img = (d.match(/\[Image 1: ([^\]]*)\]\((https?:\/\/r2\.gear4music\.com[^ )]+)/) || ['?'])[0];
    console.log('=== ' + id + ' | ' + h1);
    console.log('    price: ' + price);
    console.log('    img1: ' + img.slice(0, 220));
  }
})();
