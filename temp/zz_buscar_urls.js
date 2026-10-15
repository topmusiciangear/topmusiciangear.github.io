// Buscar la URL REAL de zZounds para los productos que caen en la portada.
// 1) busca en zZounds por nombre
// 2) extrae los codigos item-- de los resultados
// 3) verifica cada codigo abriendo su pagina y comparando el titulo
const fs = require('fs');
const { execFile } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const HOME = 'zZounds.com | Musical Instruments Music Store. Shop for Guitars, Drums, Amplifiers and Equipment.';

function get(url) {
  return new Promise(res => execFile('curl.exe',
    ['-sL', '--max-time', '45', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
    { maxBuffer: 3e7, windowsHide: true }, (e, out) => res(out || '')));
}

// quitar marcas y palabras vacias para comparar titulos
function normalizar(s) {
  return s.toLowerCase()
    .replace(/[“”"']/g, '')
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\b(the|and|with|for|of|in|by|series|pro|plus|ii|iii|iv|new|gen2|gen 2|mkii|mk2)\b/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function palabrasClave(s) {
  return normalizar(s).split(' ').filter(w => w.length >= 3 && !/^\d+$/.test(w));
}
function coincide(tituloProducto, nombreCatalogo) {
  const t = normalizar(tituloProducto);
  const ps = palabrasClave(nombreCatalogo);
  if (!ps.length) return 0;
  let n = 0;
  ps.forEach(p => { if (t.includes(p)) n++; });
  return n / ps.length;
}

(async () => {
  // ids cuyo href renderizado es la portada vacia
  const ids = [];
  fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html')).forEach(f => {
    const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
    [...d.matchAll(/<a [^>]*data-store="zzounds"[^>]*href="https:\/\/www\.zzounds\.com\/"/g)].forEach(m => {
      const antes = d.slice(Math.max(0, m.index - 9000), m.index);
      const mm = [...antes.matchAll(/openReviewModal\((\d+)\)/g)];
      if (mm.length) ids.push(+mm[mm.length - 1][1]);
    });
  });
  const unicos = [...new Set(ids)].sort((a, b) => a - b);
  console.log('productos que caen en la portada: ' + unicos.length + '\n');

  const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
  const list = Array.isArray(arr) ? arr : arr.products;
  const byId = {}; list.forEach(p => byId[p.id] = p);

  const salida = {};
  if (fs.existsSync(BASE + 'temp/zz_busqueda.json'))
    salida = JSON.parse(fs.readFileSync(BASE + 'temp/zz_busqueda.json', 'utf8'));

  let i = 0;
  async function worker() {
    while (i < unicos.length) {
      const id = unicos[i++];
      const p = byId[id];
      if (!p) continue;
      const clave = String(id);
      if (salida[clave]) continue;

      const q = encodeURIComponent(p.title);
      const html = await get('https://www.zzounds.com/prodsearch?form=search&q=' + q);

      // titulos de producto en los resultados
      const titulos = [...html.matchAll(/class="[^"]*item-name[^"]*"[^>]*>\s*<a[^>]*>\s*([^<]{3,120}?)\s*</g)]
        .map(m => m[1].replace(/&amp;/g, '&').trim());
      const codigos = [...new Set([...html.matchAll(/\/(?:a--\d+\/)?item--([A-Z0-9+]+)/g)].map(m => m[1]))];

      let mejor = null;
      for (const cod of codigos.slice(0, 8)) {
        const url = 'https://www.zzounds.com/item--' + cod;
        const h = await get(url);
        if (!h) continue;
        const t = ((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
        if (t === HOME || /This page does not exist/i.test(t)) continue;
        const nombre = t.replace(/\s*\|\s*zZounds\s*$/i, '').replace(/\s*(User Reviews|Digital Download)$/i, '').trim();
        const score = coincide(nombre, p.title);
        const deslistado = /No longer available at zZounds/i.test(h);
        const precio = (h.match(/Mfg Model:[\s\S]{0,4000}?\$([\d,]+\.\d\d)/) || [])[1];
        if (score >= 0.6 && (!mejor || score > mejor.score)) {
          mejor = { url, codigo: cod, tituloZ: nombre, score: +score.toFixed(2), deslistado, precio: precio || null };
        }
      }

      salida[clave] = {
        id, titulo: p.title,
        encontrado: mejor ? 'SI' : 'NO',
        url: mejor ? mejor.url : null,
        codigo: mejor ? mejor.codigo : null,
        score: mejor ? mejor.score : 0,
        deslistado: mejor ? mejor.deslistado : false,
        precioZz: mejor ? mejor.precio : null,
        tituloZ: mejor ? mejor.tituloZ : null
      };
      const s = salida[clave];
      console.log('  ' + String(id).padStart(4) + '  ' + (s.encontrado === 'SI' ? 'OK  ' : '--  ') +
        p.title.slice(0, 38).padEnd(40) +
        (s.encontrado === 'SI'
          ? ('$'.replace('$', '') + (s.precioZz || '?').padStart(10) + '  ' + (s.deslistado ? '(deslistado)' : '') + '  ' + s.tituloZ.slice(0, 45))
          : ''));
      fs.writeFileSync(BASE + 'temp/zz_busqueda.json', JSON.stringify(salida, null, 1), 'utf8');
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));

  const vals = Object.values(salida);
  console.log('\n' + '='.repeat(60));
  console.log('  RESULTADO: ' + vals.filter(v => v.encontrado === 'SI').length + ' con URL real / ' +
    vals.filter(v => v.encontrado === 'NO').length + ' sin coincidencia');
})();
