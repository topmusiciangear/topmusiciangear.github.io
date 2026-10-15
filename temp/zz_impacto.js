// 1) ¿las URLs de busqueda muestran realmente el producto?
// 2) ¿que precios de zZounds hay en el mapa para los 4 + los 75 deslistados?
const { execFile } = require('child_process');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function get(url) {
  return new Promise(res => execFile('curl.exe', ['-sL', '--max-time', '40', '-A', UA, url],
    { maxBuffer: 3e7, windowsHide: true }, (e, out) => res(out || '')));
}

(async () => {
  console.log('=== ¿LA BUSQUEDA ENCONTRADA MUESTRA EL PRODUCTO? ===');
  const casos = [
    ['Behringer+X32+Compact', 'X32 Compact'],
    ['Behringer+XR18', 'XR18'],
    ['sE+Electronics+NEOM+USB', 'Neom'],
    ['sE+Electronics+Neom', 'Neom']
  ];
  for (const [q, clave] of casos) {
    const h = await get('https://www.zzounds.com/prodsearch?form=search&q=' + q);
    const n = (h.match(new RegExp(clave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
    console.log('  q=' + q.padEnd(28) + ' menciones de "' + clave + '": ' + n);
  }

  // ── precios en el mapa ──
  console.log('\n=== zZounds en TEST_SHOP_BTN para los 4 rotos y los deslistados ===');
  const res = JSON.parse(fs.readFileSync(BASE + 'temp/zz_resultados.json', 'utf8'));
  const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
  const list = Array.isArray(arr) ? arr : arr.products;
  const porUrl = new Map();
  list.forEach(p => { const u = (p.stores || {}).zzounds; if (u) { const c = u.replace(/&amp;/g, '&'); if (!porUrl.has(c)) porUrl.set(c, p.id); } });

  const rotos = [], deslistados = [];
  porUrl.forEach((id, u) => {
    const e = (res[u] || {}).estado;
    if (e === '404' || e === 'CAE-EN-PORTADA') rotos.push({ id, u });
    else if (e === 'DESLISTADO') deslistados.push({ id, u });
  });

  const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
  const ini = src.indexOf('const TEST_SHOP_BTN = {');
  const bloque = src.slice(ini, src.indexOf('\n};', ini));
  const mapa = {};
  const re = /(\d+):\s*\{/g; let m;
  while ((m = re.exec(bloque)) !== null) {
    const id = +m[1];
    let d2 = 0, i = m.index + m[0].length - 1;
    for (; i < bloque.length; i++) { if (bloque[i] === '{') d2++; else if (bloque[i] === '}') { d2--; if (!d2) break; } }
    const cuerpo = bloque.slice(m.index + m[0].length, i);
    const pm = (cuerpo.match(/prices:\s*\{([\s\S]*?)\}/) || [])[1] || '';
    const zz = (pm.match(/zzounds:\s*"([^"]+)"/) || [])[1];
    mapa[id] = { zz: zz || '', oos: /\boos:\s*\[([^\]]*)\]/.exec(cuerpo), urls: /urls:\s*\{/.test(cuerpo) };
  }

  console.log('\n--- los 4 con 404 ---');
  rotos.forEach(r => {
    const e = mapa[r.id] || {};
    console.log('  id ' + String(r.id).padStart(4) + '  precio zz: ' + (e.zz || '(ninguno)').padEnd(12) +
      ' oos:' + (e.oos ? e.oos[1].replace(/["\s]/g, '') : '-') + '  urls:' + (e.urls ? 'si' : 'no'));
  });

  const conPrecio = deslistados.filter(d => mapa[d.id] && mapa[d.id].zz);
  const yaOos = deslistados.filter(d => mapa[d.id] && mapa[d.id].oos && /zzounds/.test(mapa[d.id].oos[1]));
  console.log('\n--- deslistados: ' + deslistados.length + ' ---');
  console.log('    con precio zzounds en el mapa : ' + conPrecio.length + '  <-- muestran precio pero zZounds no lo vende');
  console.log('    ya marcados oos zzounds      : ' + yaOos.length);
  console.log('    sin precio (solo link)       : ' + (deslistados.length - conPrecio.length));
  console.log('\n    los que muestran precio:');
  conPrecio.forEach(d => console.log('      ' + String(d.id).padStart(4) + '  $' + mapa[d.id].zz +
    (mapa[d.id].oos ? '  [oos: ' + mapa[d.id].oos[1].replace(/["\s]/g, '') + ']' : '')));
})();
