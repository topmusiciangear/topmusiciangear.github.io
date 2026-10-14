const https = require('https');
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}
(async () => {
  const es = await get('https://topmusiciangear.com/guides/best-interface_es.html');
  console.log('ES Audient:', es.includes('previos de consola ampliables por ADAT'));
  console.log('ES Volt2:', es.includes('tono 610 vintage por'));
  const en = await get('https://topmusiciangear.com/guides/best-interface.html');
  console.log('EN Audient:', en.includes('Console Preamps You Can Expand'));
  console.log('EN Volt2:', en.includes('Vintage 610 Tone for $199'));
})();