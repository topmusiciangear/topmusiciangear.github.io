(async () => {
  const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const resp = await fetch(url, { headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  }});
  const html = await resp.text();

  // GBP solo aparece 4 veces: ver contexto
  let i = -1, n = 0;
  while ((i = html.indexOf('GBP', i + 1)) > -1 && n < 5) {
    console.log('=== GBP @' + i + ' ===\n' + html.slice(Math.max(0, i - 260), i + 200).replace(/\s+/g, ' ') + '\n');
    n++;
  }

  // ¿hay algún JSON con precios por pais/region?
  const claves = ['priceByCountry', 'countryPrices', 'regional_prices', 'prices_by', 'currency_prices', 'localizedPrices', 'priceList'];
  claves.forEach(k => {
    if (html.indexOf(k) > -1) console.log('CLAVE ENCONTRADA: ' + k + ' @' + html.indexOf(k));
  });

  // data-layer tipico de ecommerce
  const dl = html.match(/dataLayer\.push\([\s\S]{0,1500}?\);/g);
  if (dl) {
    console.log('\ndataLayer.push encontrados: ' + dl.length);
    const conPrecio = dl.filter(x => /price|value|currency/i.test(x));
    console.log('con precio: ' + conPrecio.length);
    conPrecio.slice(0, 2).forEach(x => console.log('\n' + x.slice(0, 900).replace(/\s+/g, ' ')));
  }
})();