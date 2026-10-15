// Para los 5 con resultados: extraer el codigo real del producto correcto
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
async function probar(cod) {
  const url = 'https://www.zzounds.com/item--' + cod;
  const h = await get(url);
  if (!h) return { cod, estado: 'ERROR' };
  const t = ((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
  let e;
  if (t === HOME) e = 'CAE-EN-PORTADA';
  else if (/This page does not exist/i.test(t)) e = '404';
  else if (/No longer available at zZounds/i.test(h)) e = 'DESLISTADO';
  else if (/Add to Cart/i.test(h)) e = 'OK';
  else e = 'REVISAR';
  const precio = (h.match(/Mfg Model:[\s\S]{0,5000}?\$([\d,]+\.\d\d)/) || [])[1];
  return { cod, estado: e, titulo: t.replace(/\s*\|\s*zZounds\s*$/i, '').replace(/\s*User Reviews$/i, ''), precio: precio || null };
}

(async () => {
  const bus = JSON.parse(fs.readFileSync(BASE + 'temp/zz_busqueda.json', 'utf8'));

  // codigos ya encontrados por la busqueda
  const ya = {};
  Object.values(bus).forEach(v => { if (v.codigo) ya[v.id] = v.codigo; });

  // candidatos adicionales por patron
  const EXTRA = {
    422: ['SENHD600', 'SENHD600PRO'],
    482: ['BEHWINGC', 'BEHWINGCOMPACT', 'BEHWING'],
    413: ['PRSSTUDIOLIVE32SC', 'PRSSTUDIOLIVE32'],
    359: ['RODVMI7GOII', 'RODVMI7GOIIHELIX', 'RODVMI7'],
    449: ['AURWALRUSCANVASMONO', 'WALCANVASMONO', 'WALRUSCANVASMONO']
  };

  const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
  const list = Array.isArray(arr) ? arr : arr.products;
  const byId = {}; list.forEach(p => byId[p.id] = p);

  const objetivo = [422, 482, 413, 359, 449];
  const salida = {};
  for (const id of objetivo) {
    console.log('\n=== id ' + id + '  ' + byId[id].title + ' ===');
    const cands = [...new Set([ya[id], ...(EXTRA[id] || [])].filter(Boolean))];
    for (const cod of cands) {
      const r = await probar(cod);
      console.log('  ' + String(r.estado).padEnd(16) + ('item--' + cod).padEnd(28) + (r.titulo || '').slice(0, 60) +
        (r.precio ? '  $' + r.precio : ''));
      if (r.estado === 'OK' && !salida[id]) salida[id] = r;
    }
    // ademas: buscar en el search y listar los codigos que devuelve
    const q = encodeURIComponent(byId[id].title);
    const h = await get('https://www.zzounds.com/prodsearch?form=search&q=' + q);
    const cods = [...new Set([...h.matchAll(/\/(?:a--\d+\/)?item--([A-Z0-9+]+)/g)].map(m => m[1]))];
    console.log('  codigos en la pagina de busqueda: ' + (cods.join(', ') || '(ninguno)'));
    console.log('  VEREDICTO: ' + (salida[id] ? 'item--' + salida[id].codigo : 'sin codigo verificado -> usar URL de busqueda'));
  }
  fs.writeFileSync(BASE + 'temp/zz_final5.json', JSON.stringify(salida, null, 1), 'utf8');
})();
