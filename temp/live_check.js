const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
(async () => {
  await new Promise(r => setTimeout(r, 75000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  const i = t.indexOf('\n  435: {');
  console.log(t.slice(i, t.indexOf('\n  },', i) + 4));
  for (const lang of ['', '_es']) {
    const p = await fetch(BASE + '/guides/budget-mics' + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
    const h = await p.text();
    const c = s => (h.match(s) || []).length;
    console.log('--- ' + p.status + (lang || '_en') + ': B906 awin=' + c(/awinmid=1117[^"']*Behringer-B-906/g) + ' | awin 63816=' + c(/awinmid=63816[^"']*Behringer-B-906/g) + ' | old 26.70=' + c(/26\.70/g) + ' | old 38.70=' + c(/38\.70/g));
  }
})();
