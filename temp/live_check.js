const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
(async () => {
  await new Promise(r => setTimeout(r, 75000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  for (const id of ['433', '434']) {
    const i = t.indexOf('\n  ' + id + ': {');
    console.log(t.slice(i, t.indexOf('\n  },', i) + 4));
  }
  for (const lang of ['', '_es']) {
    const p = await fetch(BASE + '/guides/budget-mics' + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
    const h = await p.text();
    const c = s => (h.match(s) || []).length;
    console.log('--- ' + p.status + (lang || '_en') + ': Q9U OFFLINE/3JKA=' + c(/3JKA/g) + ' | P120/16B8=' + c(/16B8/g) + ' | 88.24=' + c(/88\.24/g));
  }
})();
