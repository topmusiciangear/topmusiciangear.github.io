// Verificar los item codes de zZounds con curl.exe (node recibe 403).
// Señales:
//   - <title> generico de portada  -> el codigo no existe, cae en la home
//   - "No longer available at zZounds" -> deslistado por zZounds (link OK, sin stock)
//   - caso contrario -> pagina de producto real
const { execFile } = require('child_process');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const HOME_TITLE = 'zZounds.com | Musical Instruments Music Store. Shop for Guitars, Drums, Amplifiers and Equipment.';

function fetchTitle(url) {
  return new Promise(resolve => {
    execFile('curl.exe', ['-sL', '--max-time', '40', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
      { maxBuffer: 30 * 1024 * 1024, windowsHide: true },
      (err, stdout) => {
        if (err && !stdout) return resolve({ err: err.message });
        const html = stdout || '';
        const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
        resolve({
          title: t.replace(/\s+/g, ' ').trim(),
          noLonger: /No longer available at zZounds/i.test(html),
          addToCart: /Add to Cart/i.test(html),
          len: html.length
        });
      });
  });
}

(async () => {
  console.log('=== CALIBRACION ===');
  const pruebas = [
    ['OK (esperado producto)', 'https://www.zzounds.com/item--SHUSM7B'],
    ['OK (esperado producto)', 'https://www.zzounds.com/item--AUTATHM20X'],
    ['DESLISTADO (esperado "No longer")', 'https://www.zzounds.com/item--SNYMDR7506'],
    ['CODIGO MUERTO (esperado portada/404)', 'https://www.zzounds.com/item--BEHX32COMPACT'],
    ['CODIGO MUERTO (esperado portada/404)', 'https://www.zzounds.com/item--NOEXISTEXY99']
  ];
  for (const [nota, url] of pruebas) {
    const r = await fetchTitle(url);
    const esHome = r.title === HOME_TITLE;
    console.log('\n  ' + nota);
    console.log('    url:    ' + url.replace('https://www.zzounds.com', ''));
    console.log('    titulo: ' + (r.title || r.err || '(vacio)').slice(0, 95));
    console.log('    -> portada:' + (esHome ? 'SI' : 'no') +
      ' | noLonger:' + (r.noLonger ? 'SI' : 'no') +
      ' | addToCart:' + (r.addToCart ? 'SI' : 'no') +
      ' | len:' + r.len);
  }
})();
