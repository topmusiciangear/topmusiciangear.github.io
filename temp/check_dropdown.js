const https = require('https');
https.get('https://topmusiciangear.com/guides/stream-controllers.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    const idx = data.indexOf('FLOW 8: What Six Faders');
    if (idx > -1) {
      const section = data.slice(idx, idx + 8000);
      const moreIdx = section.indexOf('shop-more-list');
      if (moreIdx > -1) {
        const dropdown = section.slice(moreIdx, moreIdx + 3000);
        const stores = dropdown.match(/data-store="[^"]+"/g);
        const prices = dropdown.match(/data-price="[^"]+"/g);
        console.log('Dropdown stores:', stores);
        console.log('Dropdown prices:', prices);
      }
    }
  });
}).on('error', e => console.log('Error:', e.message));