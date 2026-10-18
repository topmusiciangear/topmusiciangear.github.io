(async () => {
  const urls = {
    'Spire (1005)': 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/3187-Spire',
    'UAD (1021)': 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin',
    'GENOME (1020)': 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/11868-GENOME'
  };
  const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' };
  function datos(html) {
    const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
    if (!b) return { actual: 'NO', lista: 'NO' };
    const s = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
    const m = s.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
    const lt = b[0].match(/line-through[^>]*>\s*([\u20AC$£]\s?[\d.,]+)/);
    return { actual: m ? m[1] + m[2] : 'NO', lista: lt ? lt[1].replace(/\s/g, '') : 'NO' };
  }
  for (const k of Object.keys(urls)) {
    const linea = [];
    for (let i = 0; i < 3; i++) {
      const r = await fetch(urls[k] + '?cb=' + Math.random().toString(36).slice(2), { headers: H, redirect: 'follow' });
      const d = datos(await r.text());
      linea.push(d.actual + ' (lista ' + d.lista + ')');
    }
    console.log(k.padEnd(16) + linea.join('  |  '));
  }
})();