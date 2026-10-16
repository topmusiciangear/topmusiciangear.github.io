fetch('https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/11118-Nectar-4-Advanced', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
})
  .then(async r => {
    const t = await r.text();
    const pats = t.match(/(€|\$|£)\s?\d{1,4}[\.,]\d{2}/g) || [];
    console.log('precios: ' + JSON.stringify([...new Set(pats)].slice(0, 20)));
  })
  .catch(e => console.log('ERROR: ' + e.message));
