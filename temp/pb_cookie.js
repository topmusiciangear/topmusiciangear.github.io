(async () => {
  const prod = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
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
  // sesion con cookies
  let cookie = '';
  const guardar = resp => {
    const sc = resp.headers.getSetCookie ? resp.headers.getSetCookie() : [];
    sc.forEach(c => { const kv = c.split(';')[0]; if (kv && cookie.indexOf(kv.split('=')[0]) < 0) cookie += (cookie ? '; ' : '') + kv; else cookie = cookie.split('; ').filter(x => x.indexOf(kv.split('=')[0]) !== 0).join('; ') + (cookie.includes('; ') ? '; ' : '') + kv; });
  };

  for (const cc of ['GB', 'US', 'DE']) {
    cookie = '';
    const H2 = Object.assign({}, H, cookie ? { 'Cookie': cookie } : {});
    // 1) home del pais (fija la cookie de sesion con el pais)
    const r1 = await fetch('https://www.pluginboutique.com/?chosen_country=' + cc, { headers: H2, redirect: 'follow' });
    guardar(r1);
    // 2) producto con esa cookie
    const H3 = Object.assign({}, H, { 'Cookie': cookie });
    const r2 = await fetch(prod, { headers: H3, redirect: 'follow' });
    const html = await r2.text();
    console.log(cc + ' -> ' + precio(html) + '   (len ' + html.length + ', otpPrice ' + html.includes('otpPrice') + ')');
  }
})();