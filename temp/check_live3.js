const https = require('https');

function checkLive() {
  https.get('https://topmusiciangear.com/guides/best-monitors.html', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const ldMatches = data.match(/"position": \d+, "item": \{/g);
      const imgMatches = data.match(/img\/products\/[^"]+\.webp/g);
      const unique = imgMatches ? [...new Set(imgMatches)] : [];
      
      console.log('Status:', res.statusCode);
      console.log('JSON-LD positions:', ldMatches ? ldMatches.length : 0);
      console.log('Imagenes unicas:', unique.length);
      if (unique.length > 0) {
        console.log('Primeras 5 imagenes:');
        unique.slice(0, 5).forEach((img, i) => console.log('  ' + i + ': ' + img));
      }
      
      if (ldMatches && ldMatches.length === 12 && unique.length >= 12) {
        console.log('\nSITIO LIVE CORRECTO!');
      } else {
        console.log('\nEsperando deploy... (reintentando en 30s)');
        setTimeout(checkLive, 30000);
      }
    });
  }).on('error', (e) => {
    console.error('Error:', e.message);
    setTimeout(checkLive, 30000);
  });
}

checkLive();