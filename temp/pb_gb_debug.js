(async () => {
  const base = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const H = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept-Language': 'en-GB,en;q=0.9'
  };
  const r = await fetch(base + '?chosen_country=GB', { headers: H, redirect: 'follow' });
  const html = await r.text();
  console.log('status: ' + r.status);
  console.log('url final: ' + r.url);
  console.log('len: ' + html.length);
  console.log('set-cookie: ' + JSON.stringify(r.headers.getSetCookie ? r.headers.getSetCookie() : r.headers.get('set-cookie')));

  // precios que aparecen en la pagina
  const precios = [...new Set([...html.matchAll(/[\u20AC$£]\s?[\d.,]{2,}/g)].map(m => m[0]))];
  console.log('\nimportes en la pagina (' + precios.length + '):');
  precios.slice(0, 25).forEach(p => console.log('  ' + p));
  console.log('\ntiene otpPrice: ' + html.includes('otpPrice'));
  const t = html.match(/<title>([^<]*)<\/title>/);
  console.log('title: ' + (t ? t[1] : '?'));
})();