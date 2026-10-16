fetch('https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/16199-RePitch-2-Standard', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
})
  .then(async r => {
    const t = await r.text();
    console.log('len: ' + t.length);
    // buscar precios: patrones $xx.xx, €xx.xx, £xx.xx, "price"
    const pats = t.match(/(€|\$|£)\s?\d{1,4}[\.,]\d{2}/g) || [];
    console.log('precios encontrados: ' + JSON.stringify([...new Set(pats)].slice(0, 30)));
    const ld = [...t.matchAll(/<script type="application\/ld\+json">([\s\S]{0,600})/g)].map(m => m[1].slice(0, 300));
    console.log('JSON-LD: ' + JSON.stringify(ld).slice(0, 800));
  })
  .catch(e => console.log('ERROR: ' + e.message));
