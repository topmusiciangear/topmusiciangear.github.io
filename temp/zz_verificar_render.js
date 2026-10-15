// Verificar los 525 hrefs de zZounds REALMENTE renderizados en las 314 paginas
const fs = require('fs');
const { execFile } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const HOME = 'zZounds.com | Musical Instruments Music Store. Shop for Guitars, Drums, Amplifiers and Equipment.';
const SALIDA = BASE + 'temp/zz_render_resultados.json';

function fetch(url) {
  return new Promise(res => execFile('curl.exe',
    ['-sL', '--max-time', '45', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
    { maxBuffer: 3e7, windowsHide: true }, (err, out) => {
      const h = out || '';
      if (!h) return res({ estado: 'ERROR', title: err ? err.message.slice(0, 60) : '' });
      const t = ((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
      let e;
      if (t === HOME) e = 'CAE-EN-PORTADA';
      else if (/This page does not exist/i.test(t)) e = '404';
      else if (/No longer available at zZounds/i.test(h)) e = 'DESLISTADO';
      else if (/Search \| zZounds/i.test(t)) e = 'BUSQUEDA';
      else if (/Add to Cart/i.test(h)) e = 'OK';
      else e = 'REVISAR';
      res({ estado: e, title: t.slice(0, 100) });
    }));
}

(async () => {
  const urls = JSON.parse(fs.readFileSync(BASE + 'temp/zz_urls_render.json', 'utf8'));
  const guias = JSON.parse(fs.readFileSync(BASE + 'temp/zz_urls_render.json', 'utf8'));
  let hechos = {};
  if (fs.existsSync(SALIDA)) hechos = JSON.parse(fs.readFileSync(SALIDA, 'utf8'));

  console.log('a verificar: ' + urls.length + ' | ya hechos: ' +
    Object.keys(hechos).filter(k => hechos[k]).length);
  const pend = urls.filter(u => !hechos[u]);
  console.log('pendientes: ' + pend.length + '\n');

  let i = 0, n = 0;
  async function w() {
    while (i < pend.length) {
      const u = pend[i++];
      hechos[u] = await fetch(u);
      if (++n % 30 === 0) {
        console.log('  ' + n + '/' + pend.length);
        fs.writeFileSync(SALIDA, JSON.stringify(hechos, null, 1), 'utf8');
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, w));
  fs.writeFileSync(SALIDA, JSON.stringify(hechos, null, 1), 'utf8');

  const resumen = {};
  urls.forEach(u => { const e = (hechos[u] || {}).estado || 'PENDIENTE'; resumen[e] = (resumen[e] || 0) + 1; });
  console.log('\n' + '='.repeat(62));
  console.log('  zZounds RENDERIZADOS en las 314 paginas');
  console.log('='.repeat(62));
  Object.entries(resumen).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + 'x  ' + k));

  ['CAE-EN-PORTADA', '404', 'REVISAR', 'ERROR'].forEach(k => {
    const bad = urls.filter(u => (hechos[u] || {}).estado === k);
    if (!bad.length) return;
    console.log('\n  === ' + k + ' (' + bad.length + ') — LINKS ROTOS ===');
    bad.forEach(u => console.log('    ' + u.replace('https://www.zzounds.com', '')));
  });

  const dl = urls.filter(u => (hechos[u] || {}).estado === 'DESLISTADO');
  console.log('\n  === DESLISTADO (' + dl.length + ') — el link abre bien, zZounds no lo vende ===');
  dl.forEach(u => console.log('    ' + u.replace('https://www.zzounds.com', '')));
})();
