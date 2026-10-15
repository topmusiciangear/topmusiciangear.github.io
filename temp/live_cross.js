// Cruza, sobre el HTML EN VIVO: filas de la tabla comparativa vs secciones H2 de review
const https = require('https');
function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => (r.statusCode === 200 ? res(d) : rej(new Error('HTTP ' + r.statusCode))));
    }).on('error', rej);
  });
}
const clean = h => String(h == null ? '' : h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/\s+/g, ' ').trim();

(async () => {
  const guias = process.argv.slice(2);
  for (const g of guias) {
    let html;
    try { html = await get(`https://topmusiciangear.com/guides/${g}.html`); }
    catch (e) { console.log('!! ' + g + ' -> ' + e.message); continue; }
    const txt = clean(html);

    // 1. Cabeceras de la tabla comparativa
    const thead = html.match(/<thead[\s\S]*?<\/thead>/i);
    const heads = thead ? [...thead[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m => clean(m[1])) : [];

    // 2. Nombres de producto en la primera celda de cada fila
    const tbody = html.match(/<tbody[\s\S]*?<\/tbody>/i);
    const prods = tbody ? [...tbody[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)]
      .map(r => { const row = r[0]; const t = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/i); return t ? clean(t[1]) : ''; })
      .filter(Boolean) : [];

    // 3. H2 que son fichas de producto (entre "What Makes" y "Frequently Asked")
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => clean(m[1]));
    const faqIdx = h2s.findIndex(h => /Frequently Asked Questions/i.test(h));
    const fichaH2 = h2s.slice(0, faqIdx > 0 ? faqIdx : h2s.length)
      .filter(h => new RegExp(prods.map(p => p.split(/[\s(]/)[0]).join('|'), 'i').test(h) && h.length < 120);

    // 4. Veredictos (bloques de pros/cons)
    const verdicts = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => clean(m[1]));

    console.log('\n##################################################');
    console.log('# ' + g);
    console.log('# productos en la tabla: ' + prods.length);
    console.log('# H2 de ficha detectados: ' + fichaH2.length);
    prods.forEach(p => {
      const tiene = fichaH2.some(h => h.toLowerCase().includes(p.toLowerCase().slice(0, 22)));
      console.log((tiene ? '   OK   ' : '   SIN  ') + p);
    });
    console.log('-- Encabezados H2 de ficha --');
    fichaH2.forEach(h => console.log('   * ' + h));
    const rotos = h2s.filter(h => /\?\?/.test(h) || (/\?/.test(h) && !h.endsWith('?')) || (h.endsWith('?') && h.length > 100));
    if (rotos.length) { console.log('!! ENCABEZADOS ROTOS:'); rotos.forEach(h => console.log('   !! ' + h)); }
  }
})();