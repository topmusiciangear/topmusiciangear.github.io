(async () => {
  const base = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const H = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept-Language': 'en-GB,en;q=0.9'
  };
  function precio(html) {
    const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
    if (!b) return 'NO';
    const s = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
    const m = s.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
    return m ? m[1] + m[2] : 'NO';
  }
  for (const cc of ['', '?chosen_country=GB', '?chosen_country=US', '?chosen_country=DE']) {
    const r = await fetch(base + cc, { headers: H });
    const html = await r.text();
    console.log((cc || '(sin param)').padEnd(22) + ' -> ' + precio(html));
  }
})();