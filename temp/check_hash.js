const https = require('https');
https.get('https://topmusiciangear.com/index.html', (res) => {
  let d = ''; res.on('data', c => d += c); res.on('end', () => {
    // Extract hash precisely: app.min.js?v=XXXXX"
    const m = d.match(/app\.min\.js\?v=([a-z0-9]+)"/);
    console.log('Hash en vivo:', m ? m[1] : 'no encontrado');
    console.log('Esperado:     0ww02eqa');
    console.log('OK:', m && m[1] === '0ww02eqa' ? 'si' : 'no');
  });
}).on('error', e => console.log('Error:', e.message));