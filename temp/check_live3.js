(async () => {
  const u = 'https://topmusiciangear.com/guides/best-home-studio-speakers_es.html?cb=' + Date.now();
  const h = await (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  const idx = h.indexOf('Alesis ELEVATE 4: guía de ondas');
  const seg = h.slice(idx, idx + 9000);
  const buy = seg.slice(seg.indexOf('guide-section-buy'));
  console.log('--- buy block (first 3000) ---');
  console.log(buy.slice(0, 3000));
  console.log('--- markers ---');
  console.log('142:', (h.match(/142/g) || []).length, '| pound entity:', h.includes('&pound;'), '| 163:', h.includes('&#163;'), '| euro entity:', h.includes('&euro;'));
})();
