const https = require('https');
https.get('https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/guides/j48-vs-rndi_es.html', (r) => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    // Search for 9.4 or 9.5
    const matches = d.match(/9\.[45]/g);
    console.log('9.4/9.5 matches:', matches);
    // Search for "Nota" or "Score" badge
    const badge = d.match(/Nota[^<]*9\.[45]|Score[^<]*9\.[45]/g);
    console.log('Badge matches:', badge);
    // Find rating rows
    const rating = d.match(/rating-num">[0-9.]+/g);
    console.log('Rating num:', rating);
  });
});