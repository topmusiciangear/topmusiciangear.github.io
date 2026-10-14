const https = require('https');
https.get('https://topmusiciangear.com/guides/stream-controllers.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    const i = data.indexOf('726611');
    if (i > -1) console.log('Nueva imagen ENCONTRADA en vivo');
    else console.log('Nueva imagen NO encontrada');
    const j = data.indexOf('FLOW 8');
    if (j > -1) {
      const section = data.slice(j, j + 2000);
      const imgMatch = section.match(/https:\/\/r2\.gear4music\.com\/media\/[^"\s]+/);
      if (imgMatch) console.log('Imagen actual:', imgMatch[0]);
    }
  });
}).on('error', e => console.log('Error:', e.message));