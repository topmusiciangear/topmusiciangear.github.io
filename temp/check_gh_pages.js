const https = require('https');

const options = {
  hostname: 'topmusiciangear.github.io',
  path: '/guides/best-monitors.html',
  headers: { 'User-Agent': 'node.js' },
  maxRedirects: 5
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const ldMatches = data.match(/"position": \d+, "item": \{/g);
    const imgMatches = data.match(/img\/products\/[^"]+\.webp/g);
    const unique = imgMatches ? [...new Set(imgMatches)] : [];
    console.log('Status:', res.statusCode);
    console.log('Location:', res.headers.location);
    console.log('JSON-LD positions:', ldMatches ? ldMatches.length : 0);
    console.log('Imagenes unicas:', unique.length);
    if (unique.length > 0) {
      console.log('Primeras 5:');
      unique.slice(0, 5).forEach((img, i) => console.log('  ' + i + ': ' + img));
    }
  });
}).on('error', (e) => console.error('Error:', e.message));