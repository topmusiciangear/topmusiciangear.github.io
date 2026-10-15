// 1) revisar los 5 candidatos con detalle
// 2) comprobar que la URL de BUSQUEDA de zZounds muestra realmente cada producto
const fs = require('fs');
const { execFile } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function get(url) {
  return new Promise(res => execFile('curl.exe',
    ['-sL', '--max-time', '45', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
    { maxBuffer: 3e7, windowsHide: true }, (e, out) => res(out || '')));
}

function normalizar(s) {
  return s.toLowerCase().replace(/[“”"']/g, '').replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\b(the|and|with|for|of|in|by|series|pro|plus|ii|iii|iv|new)\b/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function claves(s) {
  return normalizar(s).split(' ').filter(w => w.length >= 3 && !/^\d+$/.test(w));
}

(async () => {
  console.log('=== 1) LOS 5 CANDIDATOS, EN DETALLE ===\n');
  const bus = JSON.parse(fs.readFileSync(BASE + 'temp/zz_busqueda.json', 'utf8'));
  Object.values(bus).filter(v => v.encontrado === 'SI').forEach(v => {
    const ps = claves(v.titulo), t = normalizar(v.tituloZ || '');
    const faltan = ps.filter(p => !t.includes(p));
    console.log('  id ' + v.id + '  ' + v.titulo);
    console.log('     catalogo -> zZounds: ' + (v.tituloZ || '?'));
    console.log('     coincidencia ' + Math.round(v.score * 100) + '%  |  palabras que NO estan: ' + (faltan.join(', ') || 'ninguna'));
    console.log('     ' + (faltan.length === 0 ? 'ACEPTADO' : 'RECHAZADO') + '\n');
  });

  // ids a los que hay que dar una URL que funcione
  const aArreglar = Object.values(bus).map(v => v.id);
  [670, 138, 145].forEach(x => { if (!aArreglar.includes(x)) aArreglar.push(x); });
  aArreglar.sort((x, y) => x - y);

  const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
  const list = Array.isArray(arr) ? arr : arr.products;
  const byId = {}; list.forEach(p => byId[p.id] = p);

  console.log('\n=== 2) ¿LA PAGINA DE BUSQUEDA MUESTRA EL PRODUCTO? (' + aArreglar.length + ') ===\n');
  const res = {};
  let i = 0;
  async function w() {
    while (i < aArreglar.length) {
      const id = aArreglar[i++];
      const p = byId[id];
      if (!p) continue;
      const q = encodeURIComponent(p.title);
      const url = 'https://www.zzounds.com/prodsearch?form=search&q=' + q;
      const h = await get(url);
      const ps = claves(p.title);
      const t = normalizar(h.replace(/<script[\s\S]*?<\/script>/g, ''));
      let n = 0; ps.forEach(x => { if (t.includes(x)) n++; });
      const ratio = ps.length ? n / ps.length : 0;
      //有多少个商品结果
      const nRes = (h.match(/\/(?:a--\d+\/)?item--[A-Z0-9+]+/g) || []).length;
      res[id] = { titulo: p.title, url, ratio: +ratio.toFixed(2), palabras: n + '/' + ps.length, resultados: nRes };
      console.log('  ' + String(id).padStart(4) + '  ' + (ratio >= 0.7 ? 'OK ' : '?  ') +
        String(n).padStart(2) + '/' + String(ps.length).padEnd(2) + ' palabras, ' +
        String(nRes).padStart(3) + ' resultados  ' + p.title.slice(0, 42));
    }
  }
  await Promise.all(Array.from({ length: 6 }, w));
  fs.writeFileSync(BASE + 'temp/zz_search_urls.json', JSON.stringify(res, null, 1), 'utf8');

  const buenos = Object.values(res).filter(v => v.ratio >= 0.7).length;
  console.log('\n  con el producto en la pagina de resultados: ' + buenos + '/' + aArreglar.length);
})();
