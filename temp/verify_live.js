const https = require('https');
https.get('https://topmusiciangear.com/guides/stream-controllers.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    const idx = data.indexOf('FLOW 8: What Six Faders');
    if (idx > -1) {
      const section = data.slice(idx, idx + 12000);
      const stores = section.match(/data-store="[^"]+"/g);
      const prices = section.match(/data-price="[^"]+"/g);
      console.log('LIVE stores:', stores);
      console.log('LIVE prices:', prices);
    }
  });
}).on('error', e => console.log('Error:', e.message));