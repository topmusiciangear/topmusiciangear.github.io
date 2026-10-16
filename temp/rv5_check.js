const clean = 'https://r2.gear4music.com/media/102/1025054/1200/preview.jpg';
fetch(clean, { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type')));
fetch('https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/11742-Revoice-Pro-5', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}).then(async r => {
  const t = await r.text();
  const pats = t.match(/(€|\$|£)\s?\d{1,4}[\.,]\d{2}/g) || [];
  console.log('PB precios: ' + JSON.stringify([...new Set(pats)].slice(0, 20)));
}).catch(e => console.log('PB ERROR: ' + e.message));
