const { execFile } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function get(url) {
  return new Promise(res => execFile('curl.exe',
    ['-sL', '--max-time', '45', '-A', UA, url], { maxBuffer: 3e7, windowsHide: true }, (e, out) => res(out || '')));
}

(async () => {
  for (const cod of ['WLRCANVAS', 'SENHD600']) {
    const h = await get('https://www.zzounds.com/item--' + cod);
    const t = ((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
    // todos los $ que aparecen cerca de "Add to Cart"
    const idx = h.indexOf('Add to Cart');
    const zona = idx > -1 ? h.slice(Math.max(0, idx - 3000), idx) : '';
    const precios = [...new Set((zona.match(/\$[\d,]+\.\d\d/g) || []))];
    console.log(cod + '  ->  ' + t);
    console.log('   deslistado: ' + (/No longer available at zZounds/i.test(h) ? 'SI' : 'no'));
    console.log('   precios cerca del boton: ' + (precios.join(', ') || '(ninguno)'));
    console.log('');
  }
})();
