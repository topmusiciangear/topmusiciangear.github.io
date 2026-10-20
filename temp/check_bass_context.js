(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/beginner-bass-guitars_es.html',
    'https://topmusiciangear.com/guides/beginner-bass-guitars.html'
  ]) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    console.log('=== ' + u + ' ===');
    let re = /Sire[^<"]{0,40}V5(?![R])/g, m;
    while ((m = re.exec(h))) console.log('  [V5] ...' + h.slice(Math.max(0, m.index - 90), m.index + 70).replace(/\s+/g, ' ') + '...');
    re = /4 Cuerdas/gi;
    while ((m = re.exec(h))) console.log('  [4C] ...' + h.slice(Math.max(0, m.index - 90), m.index + 70).replace(/\s+/g, ' ') + '...');
    console.log('');
  }
})();
