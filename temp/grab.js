const https = require('https');
const fs = require('fs');
const url = 'https://topmusiciangear.com/guides/best-pa-speakers.html';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
  let d = ''; r.on('data', c => d += c);
  r.on('end', () => {
    fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/live_sample.html', d, 'utf8');
    console.log('guardado ' + d.length + ' bytes, HTTP ' + r.statusCode);
  });
});