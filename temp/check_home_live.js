const https = require('https');
https.get('https://topmusiciangear.com/index.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    console.log('Home status:', res.statusCode);
    const match = data.match(/app\.min\.js\?v=([^"']+)/);
    console.log('Version hash:', match ? match[1] : 'no encontrado');
    console.log('Incluye pushGuide:', data.includes('pushGuide') || data.includes('pushguide'));
  });
}).on('error', e => console.log('Error:', e.message));