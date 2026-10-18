(async () => {
  const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const resp = await fetch(url, { headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept-Language': 'en-GB,en;q=0.9'
  }});
  const html = await resp.text();
  console.log('len: ' + html.length);

  // ¿Aparecen otras monedas en la pagina?
  ['GBP', 'USD', 'EUR', 'gbp', 'usd', 'eur'].forEach(k => {
    const n = (html.match(new RegExp(k, 'g')) || []).length;
    console.log('  ' + k + ': ' + n + ' apariciones');
  });

  // contexto de GBP/USD
  ['GBP', 'USD'].forEach(k => {
    const i = html.indexOf('"' + k + '"');
    if (i > -1) console.log('\n=== "' + k + '" @' + i + ' ===\n' + html.slice(Math.max(0, i - 200), i + 260).replace(/\s+/g, ' '));
  });

  // endpoints de precio en la pagina
  const apis = [...new Set([...html.matchAll(/"(\/[a-z0-9_\-\/\.]*(?:price|currency|locale|geo)[a-z0-9_\-\/\.]*)"/gi)].map(m => m[1]))];
  console.log('\nrutas que parecen de precio/moneda: ' + JSON.stringify(apis.slice(0, 15)));

  // algún JSON con varios precios
  const multi = [...html.matchAll(/"amount"\s*:\s*([\d.]+)[^}]{0,200}/g)].slice(0, 5);
  multi.forEach(m => console.log('amount: ' + m[0].slice(0, 200)));
})();