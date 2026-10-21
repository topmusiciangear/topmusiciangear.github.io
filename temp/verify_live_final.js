// Verificacion en vivo tras el deploy.
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

  for (const g of ['best-shotgun-mics', 'best-reverb-delay']) {
    const page = await get('https://topmusiciangear.com/guides/' + g + '.html?x=' + t);
    const html = page.buf.toString('utf8');
    const srcs = [...new Set((html.match(/src="\.\.\/img\/products\/[^"]+"/g) || []))];
    const ext = [...new Set((html.match(/https?:\/\/[^"]+zzounds[^"]+\.(?:jpg|jpeg|png|webp)/g) || []))];
    console.log(g + ': ' + page.status + ' | fotos locales ' + srcs.length + ' | zzounds ' + ext.length);
    for (const s of srcs.slice(0, 2)) {
      const p = s.replace('src="../', '').replace(/"$/, '');
      const r = await get('https://topmusiciangear.com/' + p);
      console.log('   ' + r.status + ' ' + r.type + ' ' + (r.buf.length / 1024).toFixed(0) + 'KB  ' + p);
    }
  }

  const data = await get('https://topmusiciangear.com/data/products.json?x=' + t);
  const list = JSON.parse(data.buf.toString('utf8'));
  const ext = list.filter(p => /^https?:/.test(p.img || ''));
  console.log('products.json: ' + data.status + ' | productos ' + list.length + ' | fotos externas ' + ext.length);
  for (const id of [358, 360, 595]) {
    const p = list.find(x => x.id === id);
    console.log('   id ' + id + ': ' + p.img);
  }

  const deals = await get('https://topmusiciangear.com/deals.html?x=' + t);
  const ds = deals.buf.toString('utf8');
  const local = [...new Set((ds.match(/src="img\/products\/[^"]+"/g) || []))];
  const extD = [...new Set((ds.match(/src="https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*"/g) || []))];
  console.log('deals.html: ' + deals.status + ' | fotos locales ' + local.length + ' | externas ' + extD.length);
  for (const s of local.slice(0, 2)) {
    const p = s.replace('src="', '').replace(/"$/, '');
    const r = await get('https://topmusiciangear.com/' + p);
    console.log('   ' + r.status + ' ' + r.type + ' ' + (r.buf.length / 1024).toFixed(0) + 'KB  ' + p);
  }
})();
