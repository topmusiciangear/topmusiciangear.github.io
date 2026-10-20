const urls = [
  'https://topmusiciangear.com/guides/best-home-studio-speakers_es.html',
  'https://topmusiciangear.com/guides/best-home-studio-speakers.html'
];
(async () => {
  for (const u of urls) {
    const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const h = await r.text();
    console.log('=== ' + u + ' [' + r.status + '] ===');
    console.log('ELEVATE:', (h.match(/ELEVATE/g) || []).length,
      '| Edifier:', (h.match(/Edifier/g) || []).length,
      '| ../undefined:', (h.match(/\.\.\/undefined/g) || []).length,
      '| fake ASIN:', h.includes('B00ABCDEFG'),
      '| real ASIN:', h.includes('B01IR7CFJG'));
    const i = h.indexOf('id="sec-9"');
    const seg = h.slice(i, i + 7000);
    console.log('heading:', (seg.match(/<h2[^>]*>([^<]*)/) || [])[1]);
    console.log('photo:', (seg.match(/guide-section-img[^>]*src="([^"]+)/) || [])[1] || (seg.match(/src="(https:\/\/r2[^"]+)/) || [])[1]);
    console.log('prices in buy block:', (seg.match(/(?:£|€)[\d,.]+/g) || []).join(' | '));
    console.log('stores:', (seg.match(/data-store="[a-z0-9]+"/g) || []).join(', '));
    console.log('');
  }
})();
