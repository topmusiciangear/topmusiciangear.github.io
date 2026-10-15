// AUDIT 3/4: imagenes en vivo + cobertura de precios (solo lectura)
const { execFile } = require('child_process');
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function probar(x) {
  return new Promise(res => {
    execFile('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '25',
      '-w', '%{http_code}|%{content_type}|%{size_download}', '-A', UA, x.img],
      { windowsHide: true, maxBuffer: 1 << 20 }, (e, out) => {
        const partes = (out || '|||').split('|');
        res({ id: x.id, t: x.title, code: partes[0] || 'ERR', ct: partes[1] || '?',
              ok: /^2/.test(partes[0] || '') && /^image\//i.test(partes[1] || '') });
      });
  });
}
(async () => {
  const CONC = 12, res = [];
  for (let i = 0; i < p.length; i += CONC) {
    res.push(...await Promise.all(p.slice(i, i + CONC).map(probar)));
    process.stdout.write('\r  imagenes ' + Math.min(i + CONC, p.length) + '/' + p.length);
  }
  console.log('\n');
  const rotas = res.filter(x => !x.ok);
  console.log('IMAGENES: ' + (res.length - rotas.length) + '/' + res.length + ' correctas, ' + rotas.length + ' rotas');
  // reintento de las rotas (descarta saturacion)
  for (const r of rotas) {
    const r2 = await probar(p.find(x => x.id === r.id));
    console.log('  ' + (r2.ok ? 'RECUPERADA' : 'ROTA     ') + ' ' + String(r.id).padStart(4) + '  ' + r2.code + ' ' + r2.ct + '  ' + r.t.slice(0, 55));
  }

  // cobertura de precios
  const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
  const ini = src.indexOf('const TEST_SHOP_BTN = {');
  const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();
  console.log('\nPRECIOS TEST_SHOP_BTN: ' + Object.keys(mapa).length + ' entradas / ' + p.length + ' productos');
  const sinEntrada = p.filter(x => !mapa[x.id]);
  console.log('  sin entrada: ' + sinEntrada.length);
  sinEntrada.slice(0, 15).forEach(x => console.log('    ' + x.id + '  ' + x.title.slice(0, 55)));
  let sinPrecio = 0;
  const detalle = [];
  p.forEach(x => {
    const cfg = mapa[x.id];
    if (!cfg) return;
    Object.keys(x.stores || {}).forEach(k => {
      if (k === 'reverb') return;
      if (!(cfg.prices && cfg.prices[k])) { sinPrecio++; if (detalle.length < 15) detalle.push(x.id + ' [' + k + '] ' + x.title.slice(0, 45)); }
    });
  });
  console.log('  tiendas sin precio (con URL): ' + sinPrecio);
  detalle.forEach(x => console.log('    ' + x));
})();
