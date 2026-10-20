const https = require('https');
const url = 'https://topmusiciangear.com/guides/best-monitors.html?z=' + Math.random();
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' } }, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const pick = (re) => { const m = d.match(re); return m ? m[1] : 'NO'; };
    console.log('card:    ' + pick(/guide-product-card-img--cutout\{background:([^};]+)/));
    console.log('hero:    ' + pick(/guide-detail-img--cutout\{background:([^};]+)/));
    console.log('thumb:   ' + pick(/guide-section-img--cutout\{background:([^};]+)/));
    console.log('lightbox:' + pick(/lightbox img\[src\*="\/img\/cut\/"\]\s*,[^{]*\{background:([^;!]+)/));
  });
});
