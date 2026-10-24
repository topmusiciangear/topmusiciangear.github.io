const https = require('https');

https.get('https://topmusiciangear.github.io/guides/best-monitors.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const ldMatches = data.match(/"position": \d+, "item": \{/g);
    const imgMatches = data.match(/img\/products\/[^"]+\.webp/g);
    const unique = imgMatches ? [...new Set(imgMatches)] : [];
    console.log('GitHub Pages directo:');
    console.log('Status:', res.statusCode);
    console.log('JSON-LD positions:', ldMatches ? ldMatches.length : 0);
    console.log('Imagenes unicas:', unique.length);
    if (unique.length > 0) {
      console.log('Primeras 5:');
      unique.slice(0, 5).forEach((img, i) => console.log('  ' + i + ': ' + img));
    }
  });
}).on('error', (e) => console.error('Error:', e.message));