const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const bgmap = id => { const m = bg.match(new RegExp('\\n' + id + ': \\{prices:\\{pluginboutique:"([^"]+)"')); return m ? m[1] : '?'; };

const lista = products.filter(p => p.stores && p.stores.pluginboutique);
const objetivo = [1021, 1019, 1020, 1008, 1013, 1018, 1016, 1023, 1014, 1015, 1007, 1009, 1010, 1011, 1012, 1017];
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' };

(async () => {
  const filas = [];
  for (const id of objetivo) {
    const p = products.find(x => x.id === id);
    if (!p || !p.stores.pluginboutique) continue;
    try {
      const r = await fetch(p.stores.pluginboutique, { headers: H });
      const t = await r.text();
      const bloque = t.match(/otpPrice[^>]*>([\s\S]{0,600}?)<\/div>\s*<\/div>/);
      let actual = '', lista_ = '', badge = '';
      if (bloque) {
        const b = bloque[1];
        const tachado = (b.match(/line-through[^>]*>\s*([^<]{1,20})/) || [])[1];
        const normal = b.replace(/<span[^>]*line-through[\s\S]*?<\/span>/, '').match(/>\s*([\u20AC$£][\d.,]+)\s*</);
        actual = (normal ? normal[1] : '').trim();
        lista_ = (tachado || '').trim();
        badge = ((b.match(/([\d]+%\s*off[^<]*)/i) || [])[1] || '').trim();
      }
      filas.push({ id, nombre: p.title.slice(0, 40), nuestro: bgmap(id), actual, lista: lista_, badge, status: r.status });
    } catch (e) { filas.push({ id, nombre: p.title.slice(0, 40), error: e.message }); }
  }
  console.log('id    | nuestro  | PB actual | PB lista   | oferta');
  console.log('----- | -------- | --------- | ---------- | -----');
  filas.forEach(f => {
    const ok = f.actual ? (f.nuestro === f.actual ? 'OK' : 'DIFIERE') : '?';
    console.log(String(f.id).padEnd(5) + ' | ' + String(f.nuestro).padEnd(8) + ' | ' + String(f.actual || '?').padEnd(9) + ' | ' + String(f.lista || '-').padEnd(10) + ' | ' + (f.badge || '-') + '  ' + ok);
  });
  fs.writeFileSync(B + 'temp/pb_precios_vivos.json', JSON.stringify(filas, null, 2), 'utf8');
})();