const urls = {
  565: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-RP107-Digital-Piano/50G2',
  567: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-166-Digital-Piano-Black/86RE',
  569: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-HP704-Digital-Piano-Charcoal-Black/2Y1K',
  570: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CLP-835-Digital-Piano-Satin-Black/6GTG',
  571: 'https://www.gear4music.ie/Keyboards-and-Pianos/Casio-PX-S1100-Digital-Piano-Black/42WH',
  572: 'https://www.gear4music.com/us/en/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano-Black/2U9X',
};
(async () => {
  for (const [id, u] of Object.entries(urls)) {
    const r = await fetch('https://r.jina.ai/' + u, { headers: { 'x-respond-with': 'text' }, signal: AbortSignal.timeout(60000) });
    const t = await r.text();
    console.log(`===== id=${id} =====`);
    let n = 0;
    const re = /(Price Includes VAT|Sale price|Our Price|priceText|Price:|\bPrice\b)/g;
    let m;
    while ((m = re.exec(t)) && n < 5) {
      console.log('  ...' + t.slice(Math.max(0, m.index - 80), m.index + 220).replace(/\n/g, ' ') + '...');
      n++;
    }
    const title = t.match(/Title:[\s\S]{0,120}/);
    console.log('  ' + (title ? title[0].replace(/\n/g, ' ') : 'no title'));
  }
})();
