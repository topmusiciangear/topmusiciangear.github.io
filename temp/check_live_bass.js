(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/beginner-bass-guitars_es.html',
    'https://topmusiciangear.com/guides/beginner-bass-guitars.html'
  ]) {
    const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } });
    const h = await r.text();
    console.log('=== ' + u + ' [' + r.status + '] ===');
    console.log('GSR200:', (h.match(/GSR200/g) || []).length,
      '| V5R:', (h.match(/V5R/g) || []).length,
      '| "Bajo Ibanez":', /Bajo Ibanez/i.test(h),
      '| "Bajo Sire":', /Bajo Sire/i.test(h),
      '| "4 Cuerdas":', /4 Cuerdas/i.test(h),
      '| ../undefined:', (h.match(/\.\.\/undefined/g) || []).length,
      '| old ASIN B0002F5U7K:', h.includes('B0002F5U7K'),
      '| new ASIN B003CK5EOC:', h.includes('B003CK5EOC'));
    const bad = h.match(/Sire[^<"]{0,30}V5(?![R])/g) || [];
    console.log('old V5 mentions:', bad.length, bad.slice(0, 5).join(' / '));
    console.log('');
  }
})();
