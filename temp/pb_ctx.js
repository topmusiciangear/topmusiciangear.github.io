const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' } })
  .then(async r => {
    const t = await r.text();
    ['\u20AC49.40', '\u20AC251.08'].forEach(imp => {
      let i = -1, n = 0;
      while ((i = t.indexOf(imp, i + 1)) > -1 && n < 3) {
        console.log('\n=== ' + imp + ' (ocurrencia ' + (n + 1) + ') ===');
        console.log(t.slice(Math.max(0, i - 320), i + 220).replace(/\s+/g, ' '));
        n++;
      }
    });
    // marcas de oferta
    const saleCtx = [];
    const re = /(sale_price|special_price|You save|ends|until|limited)/gi;
    let m; while ((m = re.exec(t)) !== null && saleCtx.length < 6) saleCtx.push(t.slice(Math.max(0, m.index - 90), m.index + 130).replace(/\s+/g, ' '));
    console.log('\n=== contexto de oferta ===');
    saleCtx.forEach(c => console.log('  ...' + c + '...'));
  })
  .catch(e => console.log('ERROR ' + e.message));