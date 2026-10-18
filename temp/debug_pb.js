(async () => {
  const r = await fetch('https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    }
  });
  const html = await r.text();

  // Buscar todo lo que parezca precio
  const prices = [...new Set([...html.matchAll(/[\u20AC$£]\s*[\d.,]{2,}/g)].map(m => m[0]))];
  console.log('Precios únicos encontrados (' + prices.length + '):');
  prices.forEach(p => console.log('  ' + p));

  // Buscar en bloques específicos
  const bloques = ['otpPrice', 'data-layer', 'priceCurrency', 'price"', 'og:price', 'product:price'];
  bloques.forEach(b => {
    const matches = html.match(new RegExp(b + '[\\s\\S]{0,300}', 'gi'));
    if (matches) {
      console.log('\n=== ' + b + ' ===');
      matches.slice(0, 3).forEach(m => console.log(m.slice(0, 400)));
    });
  });
})().catch(console.error);