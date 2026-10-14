const https = require('https');
https.get('https://topmusiciangear.com/guides/stream-controllers.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    const ids = [243, 246, 659, 248, 661, 244, 240, 247, 662, 663, 671];
    ids.forEach(function(id) {
      const idx = data.indexOf('data-id="' + id + '"');
      if (idx > -1) console.log('ID ' + id + ' encontrado en: ' + idx);
    });
    const cidx = data.indexOf('Conclusion');
    if (cidx > -1) console.log('Conclusion en: ' + cidx);
  });
}).on('error', e => console.log('Error:', e.message));