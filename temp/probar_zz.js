// Probar si node puede leer zZounds con cabeceras de navegador
const https = require('https');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function probar(url) {
  return new Promise(resolve => {
    const req = https.get(url, {
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity'
      },
      timeout: 25000
    }, res => {
      let body = '';
      res.on('data', d => { body += d; if (body.length > 400000) { res.destroy(); } });
      res.on('end', () => resolve({ status: res.statusCode, len: body.length, body }));
      res.on('close', () => resolve({ status: res.statusCode, len: body.length, body }));
    });
    req.on('error', e => resolve({ status: 'ERR ' + e.message, len: 0, body: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT', len: 0, body: '' }); });
  });
}

(async () => {
  const urls = [
    'https://www.zzounds.com/item--FABPROQ',
    'https://www.zzounds.com/item--SNYMDR7506',
    'https://www.zzounds.com/a--925521/item--SHUSM57LC'
  ];
  for (const u of urls) {
    const r = await probar(u);
    const noDisp = /No longer available at zZounds/i.test(r.body);
    const precio = (r.body.match(/class="[^"]*price[^"]*"[^>]*>\s*\$([\d,]+\.\d\d)/) || [])[1];
    console.log(r.status + '  len ' + String(r.len).padStart(7) +
      '  noDisponible:' + (noDisp ? 'SI' : 'no') +
      '  precio:' + (precio || '-') + '  ' + u);
  }
})();
