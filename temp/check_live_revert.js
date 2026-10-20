const https = require('https');
const url = 'https://topmusiciangear.com/guides/best-monitors.html?z=' + Math.random();
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' } }, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    console.log('src img/cut :', (d.match(/src="[^"]*img\/cut\//g) || []).length);
    console.log('clase cutout:', (d.match(/--cutout/g) || []).length);
    const m = d.match(/class="guide-product-card-img"[^>]*><img src="([^"]+)"/);
    console.log('primera card:', m && m[1]);
    const h = d.match(/class="guide-detail-img"[^>]*><img src="([^"]+)"/);
    console.log('hero       :', h && h[1]);
    console.log('lightbox img en CSS inline:', d.includes('#lightbox img'));
  });
});
