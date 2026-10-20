(async () => {
  const urls = [
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150.html',
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html'
  ];
  for (const u of urls) {
    const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const h = await r.text();
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    console.log(u.split('/').pop(), '->', r.status);
    console.log('  title:', t);
    console.log('  Edifier:', (h.match(/Edifier/gi) || []).length, '| Alesis:', (h.match(/Alesis/g) || []).length, '| 9.5:', h.includes('9.5'));
  }
  for (const u of [
    'https://topmusiciangear.com/guides/best-home-studio-speakers.html',
    'https://topmusiciangear.com/guides/best-home-studio-speakers_es.html'
  ]) {
    const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const h = await r.text();
    const can = (h.match(/rel="canonical" href="([^"]+)"/) || [])[1];
    const ref = (h.match(/http-equiv="refresh" content="([^"]+)"/) || [])[1];
    console.log(u.split('/').pop(), '->', r.status, '| len:', h.length);
    console.log('  refresh:', ref);
    console.log('  canonical:', can);
  }
  const sm = await (await fetch('https://topmusiciangear.com/sitemap.xml?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  console.log('sitemap new:', (sm.match(/best-studio-monitors-under-150/g) || []).length, '| sitemap old:', (sm.match(/best-home-studio-speakers/g) || []).length);
  const d = await (await fetch('https://topmusiciangear.com/deals.html?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  console.log('deals old links:', (d.match(/best-home-studio-speakers/g) || []).length, '| deals new links:', (d.match(/best-studio-monitors-under-150/g) || []).length);
})();
