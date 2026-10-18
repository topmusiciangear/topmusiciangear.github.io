const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// Detecta IP/país y scrapea los 35 productos de Plugin Boutique en la región ACTUAL
const lista = JSON.parse(fs.readFileSync(B + 'temp/pb_scrape_final.json', 'utf8'));
const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-GB,en;q=0.9'
};

function precio(html) {
  const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
  if (!b) return null;
  const s = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
  const m = s.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
  if (!m) return null;
  const lt = b[0].match(/line-through[^>]*>\s*([\u20AC$£]\s?[\d.,]+)/);
  const pr = b[0].match(/(\d+%\s*off[^<]*)/i);
  return {
    simbolo: m[1],
    valor: parseFloat(m[2].replace(/,/g, '')),
    lista: lt ? parseFloat(lt[1].replace(/[^\d.]/g, '')) : null,
    promo: pr ? pr[1].trim() : null
  };
}

(async () => {
  // 1. IP y pais
  let info = {};
  try {
    const r = await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    info = await r.json();
  } catch (e) { info = { error: e.message }; }
  const pais = info.country || '??';
  console.log('IP: ' + info.ip + '  Pais: ' + pais + '  (' + (info.city || '?') + ', ' + (info.org || '?') + ')');

  // 2. Scrapear
  const res = [];
  for (const p of lista) {
    let d = null;
    try {
      const r = await fetch(p.url, { headers: H, redirect: 'follow' });
      d = precio(await r.text());
    } catch (e) { d = null; }
    res.push({ id: p.id, title: p.title, precio: d });
    if (d) {
      console.log('  ' + String(p.id).padEnd(5) + p.title.slice(0, 36).padEnd(37) +
        d.simbolo + d.valor.toFixed(2) + (d.lista ? '   (lista ' + d.simbolo + d.lista.toFixed(2) + ')' : '') +
        (d.promo ? '   ' + d.promo : ''));
    } else {
      console.log('  ' + String(p.id).padEnd(5) + p.title.slice(0, 36).padEnd(37) + 'SIN PRECIO');
    }
  }

  const archivo = B + 'temp/pb_precios_' + pais + '.json';
  fs.writeFileSync(archivo, JSON.stringify({ region: { ip: info.ip, pais: pais, org: info.org }, productos: res }, null, 2), 'utf8');

  const monedas = [...new Set(res.filter(r => r.precio).map(r => r.precio.simbolo))];
  const ok = res.filter(r => r.precio).length;
  console.log('\nRegion ' + pais + ' | productos con precio: ' + ok + '/' + res.length + ' | monedas: ' + JSON.stringify(monedas));
  console.log('Guardado en temp/pb_precios_' + pais + '.json');
})();