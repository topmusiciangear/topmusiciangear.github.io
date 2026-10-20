(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/beginner-bass-guitars_es.html',
    'https://topmusiciangear.com/guides/beginner-bass-guitars.html'
  ]) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    console.log('=== ' + u.split('/').pop() + ' ===');
    const v = h.indexOf('verdict-text');
    const vt = h.slice(v, h.indexOf('guide-verdict-grid', v));
    const ps = (vt.match(/<p>[\s\S]*?<\/p>/g) || []).map(p => p.replace(/<[^>]+>/g, '').trim());
    console.log('paragraphs:', ps.length);
    ps.forEach((p, i) => console.log(' ' + (i + 1) + '. ' + p.slice(0, 70)));
    console.log('GSR200 in verdict:', /GSR200/.test(vt));
    console.log('"todavía mejor":', h.includes('todavía mejor'));
    const grid = h.slice(h.indexOf('guide-verdict-grid'));
    const names = (grid.slice(0, 6000).match(/verdict-product-name">([^<]+)/g) || []).map(x => x.split('>')[1]);
    console.log('grid:', names.join(' | '));
    console.log('');
  }
})();
