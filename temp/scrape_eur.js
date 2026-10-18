const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const lista = JSON.parse(fs.readFileSync(B + 'temp/pb_scrape_final.json', 'utf8'));

function extraer(html) {
  const out = { actual: null, lista: null, promo: null, moneda: null };
  const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
  if (b) {
    const sinTachado = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
    const m = sinTachado.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
    if (m) { out.actual = m[1] + m[2]; out.moneda = m[1]; }
    const lt = b[0].match(/line-through[^>]*>\s*([\u20AC$£]\s?[\d.,]+)/);
    if (lt) out.lista = lt[1].replace(/\s/g, '');
    const pr = b[0].match(/(\d+%\s*off[^<]*)/i);
    if (pr) out.promo = pr[1].trim();
  }
  if (!out.actual) {
    const j = html.match(/"price"\s*:\s*"?([\d.,]+)"?/);
    if (j) out.actual = '\u20AC' + j[1];
  }
  return out;
}

(async () => {
  const res = [];
  for (const p of lista) {
    let r;
    try {
      const resp = await fetch(p.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9'
        }
      });
      const html = await resp.text();
      r = Object.assign({ id: p.id, title: p.title, status: resp.status }, extraer(html));
    } catch (e) {
      r = { id: p.id, title: p.title, error: e.message };
    }
    res.push(r);
    console.log(p.id + ' ' + String(p.title).slice(0, 38).padEnd(38) + ' ' +
      (r.actual || 'NO') + ' | lista ' + (r.lista || '-') + ' | ' + (r.promo || '-'));
  }
  fs.writeFileSync(B + 'temp/pb_eur_live.json', JSON.stringify(res, null, 2), 'utf8');
  const ok = res.filter(r => r.actual).length;
  console.log('\ncon precio: ' + ok + '/' + res.length);
  const monedas = [...new Set(res.filter(r => r.moneda).map(r => r.moneda))];
  console.log('monedas detectadas: ' + JSON.stringify(monedas));
})();