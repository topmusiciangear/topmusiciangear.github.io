const https = require('https');
https.get('https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/guides/j48-vs-rndi_es.html', (r) => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const m = d.match(/guide-product-card-rating-num">([0-9.]+)/g);
    console.log(m);
  });
});