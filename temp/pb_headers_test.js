(async () => {
  const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const base = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' };

  const variantes = {
    'A solo UA': base,
    'B UA + en-GB': Object.assign({}, base, { 'Accept-Language': 'en-GB,en;q=0.9' }),
    'C UA + en-US': Object.assign({}, base, { 'Accept-Language': 'en-US,en;q=0.9' }),
    'D UA + en (sin pais)': Object.assign({}, base, { 'Accept-Language': 'en' }),
    'E como script1 (Sec-Fetch + gzip)': Object.assign({}, base, {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Sec-Fetch-Dest': 'document', 'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none', 'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1', 'Cache-Control': 'max-age=0'
    })
  };

  function precio(html) {
    const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
    if (!b) return 'NO';
    const s = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
    const m = s.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
    return m ? m[1] + m[2] : 'NO';
  }

  for (const k of Object.keys(variantes)) {
    try {
      const r = await fetch(url, { headers: variantes[k] });
      const html = await r.text();
      console.log(k.padEnd(32) + ' -> ' + precio(html));
    } catch (e) { console.log(k + ' ERROR ' + e.message); }
  }
})();