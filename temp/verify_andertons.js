const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const IDS = [6, 103, 126, 309, 310, 311, 312, 313, 317, 318, 319, 320];
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const src = fs.readFileSync('build-guides.js', 'utf8');
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const MAP = Function('return {' + m[1] + '\n}')();
const clean = (u) => {
  if (!u) return '';
  const p = u.match(/[?&]ued=([^&]+)/); if (p) return decodeURIComponent(p[1]);
  return u;
};
(async () => {
  for (const id of IDS) {
    const p = prods.find(x => x.id === id);
    const cfg = MAP[id] || {};
    const a = p.stores && p.stores.andertons;
    const row = { id, title: p.title, ourPrice: (cfg.prices || {}).andertons, ourUrl: a || (cfg.urls || {}).andertons || '(none)' };
    if (!a) { console.log(JSON.stringify({ ...row, live: 'NO-LINK-IN-CATALOG' })); continue; }
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(a, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, signal: ctrl.signal });
      const html = await r.text();
      let name = '', price = '', avail = '';
      const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
      for (const b of blocks) {
        let j; try { j = JSON.parse(b[1].trim()); } catch (e) { continue; }
        const arr = Array.isArray(j) ? j : [j];
        for (const o of arr) {
          if (o && (o['@type'] === 'Product' || (Array.isArray(o['@type']) && o['@type'].includes('Product')))) {
            name = o.name || name;
            const off = o.offers || {};
            const oa = Array.isArray(off) ? off[0] : off;
            price = (oa && (oa.price || oa.lowPrice)) || price;
            avail = (oa && (oa.availability || oa.itemCondition)) || avail;
          }
        }
      }
      const ogTitle = (html.match(/<meta property="og:title" content="([^"]+)"/) || [])[1] || '';
      console.log(JSON.stringify({ ...row, status: r.status, liveName: name || ogTitle, livePrice: price, avail, finalUrl: r.url.replace(/\/$/, '') }));
    } catch (e) {
      console.log(JSON.stringify({ ...row, live: 'FETCH-ERR ' + e.message }));
    } finally { clearTimeout(t); }
  }
})();
