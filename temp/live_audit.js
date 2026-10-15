// Auditoria de lo que REALMENTE se ve en la web en vivo
const https = require('https');

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, body: d }));
    }).on('error', rej);
  });
}

// quita scripts/styles para no contar texto de codigo
function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

(async () => {
  const guias = process.argv.slice(2);
  for (const g of guias) {
    for (const lang of ['', '_es']) {
      const url = `https://topmusiciangear.com/guides/${g}${lang}.html`;
      let r;
      try { r = await get(url); } catch (e) { console.log('ERROR ' + url + ' ' + e.message); continue; }
      if (r.status !== 200) { console.log(`${g}${lang} -> HTTP ${r.status}`); continue; }
      const vis = visible(r.body);
      const h2 = (r.body.match(/<h2[^>]*>/gi) || []).length;
      const cards = (r.body.match(/guide-product-card|product-card/g) || []).length;
      const imgs = (r.body.match(/<img[^>]+loading|class="[^"]*img/g) || []).length;
      console.log(`\n=== ${g}${lang}  HTTP ${r.status}  | h2: ${h2} | tarjetas: ${cards} | bytes visibles: ${vis.length}`);
      const m = r.body.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
      m.forEach(x => console.log('   H2: ' + x.replace(/<[^>]+>/g, '').trim().slice(0, 70)));
    }
  }
})();