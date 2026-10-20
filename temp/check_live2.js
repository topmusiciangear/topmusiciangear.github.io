const checks = [
  ['https://topmusiciangear.com/guides/best-home-studio-speakers_es.html', {
    heading: 'Alesis ELEVATE 4: guía de ondas + salida sub en par económico',
    priceG4M: '£142.00', priceMS: '€119.00', compare: 'Comparar en 5 tiendas más',
    sec6: 'Los altavoces más vendidos de esta franja no son monitores'
  }],
  ['https://topmusiciangear.com/guides/best-home-studio-speakers.html', {
    heading: 'Alesis ELEVATE 4: Elliptical Waveguide and a Sub Out Under $150',
    priceG4M: '£142.00', priceMS: '€119.00', compare: 'Compare 5 more stores',
    sec6: 'The Most Popular Speakers in This Price Range Are Not Monitors'
  }]
];
(async () => {
  for (const [u, c] of checks) {
    const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const h = await r.text();
    console.log('=== ' + u + ' [' + r.status + '] ===');
    for (const k of Object.keys(c)) console.log('  ' + k + ':', h.includes(c[k]));
    console.log('  9.5 badge:', h.includes('9.5'));
    console.log('');
  }
})();
