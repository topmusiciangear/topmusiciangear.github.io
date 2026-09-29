const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const URLS = [
  'https://www.andertons.co.uk/catalogsearch/result/?q=american+professional+ii+telecaster',
  'https://www.andertons.co.uk/catalogsearch/result/?q=american+professional+ii+stratocaster',
  'https://www.andertons.co.uk/esp-e-ii-eclipse-db-gransp-granite-sparkle/'
];
(async () => {
  for (const u of URLS) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } });
      const h = await r.text();
      const links = [...new Set([...h.matchAll(/href="(\/[a-z0-9-]*(?:american-professional-ii|esp-e-ii)[a-z0-9-]*)\//g)].map(x => 'https://www.andertons.co.uk' + x[1] + '/'))];
      const m = h.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g) || [];
      let prod = '';
      for (const b of m) { const j = JSON.parse(b.replace(/<script[^>]*>/, '').replace(/<\/script>/, '').trim()); for (const o of (Array.isArray(j) ? j : [j])) { if (o && o['@type'] === 'Product') { const off = Array.isArray(o.offers) ? o.offers[0] : o.offers; prod = (o.name || '') + ' | ' + (off && off.price) + ' | ' + (off && off.availability); } } }
      console.log('== ' + r.status + ' ' + u);
      if (prod) console.log('   PRODUCT: ' + prod);
      links.slice(0, 25).forEach(l => console.log('   ' + l));
    } catch (e) { console.log('ERR ' + u + ' ' + e.message); }
  }
})();
