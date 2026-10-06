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
    try {
      const r = await fetch('https://r.jina.ai/' + u, { headers: { 'x-respond-with': 'text' }, signal: AbortSignal.timeout(60000) });
      const t = await r.text();
      const head = t.slice(0, 400).replace(/\n+/g, ' | ');
      const prices = (t.match(/(?:£|€|\$)\s?[\d,]+(?:\.\d{2})?/g) || []).slice(0, 8);
      const title = (t.match(/^Title:\s*.+$/m) || [''])[0];
      console.log(`id=${id} status=${r.status}\n  ${title}\n  prices=${JSON.stringify([...new Set(prices)])}\n  head=${head.slice(0, 260)}\n`);
    } catch (e) { console.log(`id=${id} ERR ${e.message}`); }
  }
})();
