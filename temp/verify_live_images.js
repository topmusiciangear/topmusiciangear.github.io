// Verificacion en vivo: fotos locales del sitio + guia real.
const https = require('https');

function get(url, redirect = 0) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' } }, r => {
      if ([301, 302, 307, 308].includes(r.statusCode) && r.headers.location && redirect < 3) {
        r.resume();
        return resolve(get(new URL(r.headers.location, url).href, redirect + 1));
      }
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve({ status: r.statusCode, type: r.headers['content-type'], buf: Buffer.concat(chunks) }));
    }).on('error', e => resolve({ status: 0, error: e.message, buf: Buffer.alloc(0) }));
  });
}

(async () => {
  const t = Date.now();

  const page = await get('https://topmusiciangear.com/guides/best-monitors.html?x=' + t);
  const html = page.buf.toString('utf8');
  const cards = [...new Set((html.match(/src="\.\.\/img\/products\/[^"]+"/g) || []))];
  const hero = (html.match(/property="og:image" content="([^"]+)"/) || [])[1];
  console.log('guia:', page.status, '| cards locales:', cards.length, '| primera:', cards[0]);
  console.log('og:image:', hero);

  const ogPath = hero.replace('https://topmusiciangear.com/', '');
  const img = await get('https://topmusiciangear.com/' + ogPath);
  console.log('imagen og:', img.status, img.type, (img.buf.length / 1024).toFixed(0) + ' KB');

  const cardPath = cards[0].replace('src="../', '').replace(/"$/, '');
  const card = await get('https://topmusiciangear.com/' + cardPath);
  console.log('imagen card:', card.status, card.type, (card.buf.length / 1024).toFixed(0) + ' KB', cardPath);

  const data = await get('https://topmusiciangear.com/data/products.json?x=' + t);
  const list = JSON.parse(data.buf.toString('utf8'));
  const ext = list.filter(p => /^https?:/.test(p.img || ''));
  const loc = list.filter(p => /^img\/products\//.test(p.img || ''));
  console.log('products.json:', data.status, '| locales:', loc.length, '| externas:', ext.length);
  ext.forEach(p => console.log('   pendiente:', p.id, p.title));
})();
