const https = require('https');
https.get('https://topmusiciangear.com/guides/stream-controllers.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    const tail = data.slice(-10000);
    const matches = tail.match(/data-store="[^"]+"|data-price="[^"]+"|671/gi);
    console.log('Matches en featured:', matches ? matches.slice(0, 30) : 'none');
  });
}).on('error', e => console.log('Error:', e.message));