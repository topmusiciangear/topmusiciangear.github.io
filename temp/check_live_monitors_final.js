(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150.html',
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html'
  ]) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1].replace(/<[^>]+>/g, '').trim();
    console.log(u.split('/').pop());
    console.log('  title:', t);
    console.log('  h1   :', h1);

    const tableStart = h.indexOf('<table');
    const ths = (h.slice(tableStart, tableStart + 5000).match(/<th[\s\S]*?<\/th>/g) || []).map(x => x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
    console.log('  table:', ths.join(' | '));

    const v = h.slice(h.indexOf('verdict-text'), h.indexOf('guide-verdict-grid'));
    console.log('  verdict:', (v.match(/product-name">([^<]+)</g) || []).map(x => x.split('>')[1]).join(' | '));

    const scores = [];
    const marker = 'letter-spacing:-.01em;">';
    let idx = 0;
    while ((idx = h.indexOf(marker, idx)) !== -1) {
      const val = h.slice(idx + marker.length, idx + marker.length + 3);
      if (/^9\.\d/.test(val)) scores.push(val);
      idx += 1;
    }
    console.log('  badges:', scores.join(', '));
  }
})();
