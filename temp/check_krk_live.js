const https = require('https');

https.get('https://topmusiciangear.com/guides/best-monitors.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('KRK Rokit 7');
    if (idx > 0) {
      console.log('=== KRK Rokit 7 encontrado ===');
      console.log(data.substring(idx - 200, idx + 500));
    } else {
      console.log('NO encontrado');
    }
  });
}).on('error', (e) => console.error('Error:', e.message));