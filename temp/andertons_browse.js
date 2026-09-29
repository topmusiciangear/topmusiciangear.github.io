const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const URLS = [
  'https://www.gear4music.com/us/en/Recording-and-Computers/OFFLINE-Samson-Q9U-USB-XLR-Dynamic-Broadcast-Microphone/3JKA',
  'https://www.gear4music.com/Recording-and-Computers/Samson-Q9U-USB-XLR-Dynamic-Broadcast-Microphone/3JKA',
  'https://www.gear4music.com/Recording-and-Computers/AKG-P120-Large-Diaphragm-Condenser-Microphone/16B8'
];
(async () => {
  for (const u of URLS) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, redirect: 'follow' });
      const h = await r.text();
      const title = (h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 90);
      const price = (h.match(/data-price-amount="([^"]+)"/) || h.match(/"price"\s*:\s*"?([\d.,]+)"?/) || [])[1];
      const avail = /out of stock/i.test(h) ? 'OUT-OF-STOCK' : '';
      console.log(r.status + '  ' + r.url.replace('https://www.gear4music.com', ''));
      console.log('      title="' + title + '"  price=' + (price || '?') + '  ' + avail);
    } catch (e) { console.log('ERR ' + u + '  ' + e.message); }
  }
})();
