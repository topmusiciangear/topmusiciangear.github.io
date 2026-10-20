const https = require('https');
https.get('https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/guides/j48-vs-rndi_es.html', (r) => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    // Find product names in order
    const products = d.match(/guide-product-card-title">[^<]+/g);
    console.log('Products:', products);
    // Find the scores in order
    const scores = d.match(/Nuestra nota: [0-9.]+/g);
    console.log('Scores in order:', scores);
  });
});