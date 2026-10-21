const https = require('https');

function head(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' } }, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve({ status: r.statusCode, type: r.headers['content-type'], size: Buffer.concat(chunks).length }));
    }).on('error', e => resolve({ status: 0, error: e.message, size: 0 }));
  });
}

(async () => {
  const files = {
    'AT875R (358)': 'img/products/2daadbd531.webp',
    'MKH 50-P48 (360)': 'img/products/6a1ef69fbd.webp',
    'Keeley Caverns V2 (595)': 'img/products/8f5e30291d.webp',
  };
  for (const [name, f] of Object.entries(files)) {
    const r = await head('https://topmusiciangear.com/' + f + '?x=' + Date.now());
    console.log(name + ': ' + r.status + ' ' + r.type + ' ' + (r.size / 1024).toFixed(0) + ' KB');
  }
})();
