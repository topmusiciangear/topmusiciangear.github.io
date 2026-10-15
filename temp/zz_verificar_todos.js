// Verificar TODOS los links de zZounds de data/products.json con curl.exe.
// Clasifica cada uno: OK / DESLISTADO / CAE-EN-PORTADA / 404 / ERROR
const fs = require('fs');
const { execFile } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const HOME_TITLE = 'zZounds.com | Musical Instruments Music Store. Shop for Guitars, Drums, Amplifiers and Equipment.';
const SALIDA = BASE + 'temp/zz_resultados.json';

function fetch(url) {
  return new Promise(resolve => {
    execFile('curl.exe', ['-sL', '--max-time', '45', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
      { maxBuffer: 30 * 1024 * 1024, windowsHide: true },
      (err, stdout) => {
        const html = stdout || '';
        if (!html && err) return resolve({ estado: 'ERROR', detalle: err.message });
        const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
        const title = t.replace(/\s+/g, ' ').trim();
        let estado;
        if (!html) estado = 'ERROR';
        else if (title === HOME_TITLE) estado = 'CAE-EN-PORTADA';
        else if (/This page does not exist/i.test(title)) estado = '404';
        else if (/No longer available at zZounds/i.test(html)) estado = 'DESLISTADO';
        else if (/Add to Cart/i.test(html)) estado = 'OK';
        else estado = 'REVISAR';
        resolve({ estado, title: title.slice(0, 110) });
      });
  });
}

(async () => {
  const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
  const list = Array.isArray(arr) ? arr : arr.products;

  // una entrada por URL distinta
  const porUrl = new Map();
  list.forEach(p => {
    const u = (p.stores || {}).zzounds;
    if (!u) return;
    const limpio = u.replace(/&amp;/g, '&');
    if (!porUrl.has(limpio)) porUrl.set(limpio, []);
    porUrl.get(limpio).push({ id: p.id, titulo: p.title });
  });

  const urls = [...porUrl.keys()];
  console.log('URLs de zZounds distintas a verificar: ' + urls.length);
  console.log('Productos cubiertos: ' + list.filter(p => (p.stores || {}).zzounds).length + '\n');

  // cargar progreso previo (reanudable)
  let hechos = {};
  if (fs.existsSync(SALIDA)) hechos = JSON.parse(fs.readFileSync(SALIDA, 'utf8'));
  const pendientes = urls.filter(u => !hechos[u]);
  console.log('ya verificados: ' + (urls.length - pendientes.length) + ' | pendientes: ' + pendientes.length + '\n');

  const CONC = 8;
  let i = 0, n = 0;
  async function worker() {
    while (i < pendientes.length) {
      const u = pendientes[i++];
      const r = await fetch(u);
      hechos[u] = Object.assign({}, r, { ts: new Date().toISOString().slice(0, 10) });
      n++;
      if (n % 25 === 0) {
        console.log('  ' + n + '/' + pendientes.length + '...');
        fs.writeFileSync(SALIDA, JSON.stringify(hechos, null, 1), 'utf8');
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  fs.writeFileSync(SALIDA, JSON.stringify(hechos, null, 1), 'utf8');

  // informe
  const resumen = {};
  urls.forEach(u => { const e = (hechos[u] || {}).estado || 'PENDIENTE'; resumen[e] = (resumen[e] || 0) + 1; });
  console.log('\n' + '='.repeat(64));
  console.log('  RESUMEN');
  console.log('='.repeat(64));
  Object.entries(resumen).sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + 'x  ' + k));

  ['CAE-EN-PORTADA', '404', 'REVISAR', 'DESLISTADO', 'ERROR'].forEach(k => {
    const malos = urls.filter(u => (hechos[u] || {}).estado === k);
    if (!malos.length) return;
    console.log('\n  === ' + k + ' (' + malos.length + ') ===');
    malos.forEach(u => {
      const ps = porUrl.get(u);
      console.log('    id ' + String(ps[0].id).padStart(4) + '  ' + ps[0].titulo.slice(0, 42).padEnd(44) +
        u.replace('https://www.zzounds.com', '').slice(0, 60));
      ps.slice(1).forEach(x => console.log('            + id ' + x.id + ' ' + x.titulo.slice(0, 40)));
    });
  });
})();
