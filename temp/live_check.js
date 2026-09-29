const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = (process.argv[2] || 'best-instrument-mics').split(',');
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const m = new RegExp('(^|[^0-9])215: \\{[\\s\\S]{0,300}?\\n  \\},', 'm').exec(t);
  console.log(m ? m[0].replace(/^[^0-9]+/, '') : 'id 215 NOT FOUND');
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  console.log('shop-buttons.js 461.34 count: ' + (t.match(/461\.34/g) || []).length);
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const i = h.indexOf('4099');
      const seg = i >= 0 ? h.slice(Math.max(0, i - 4000), i + 4000) : '';
      console.log('--- ' + g + lang + ': 4099 present=' + (i >= 0) + ' | 532.00=' + (h.match(/532\.00/g) || []).length + ' 405.00=' + (h.match(/405\.00/g) || []).length + ' 660.00=' + (h.match(/\$660\.00/g) || []).length + ' | STALE 461.34=' + (h.match(/461\.34/g) || []).length + ' | ms art=' + (seg.match(/art-[A-Z0-9]+-000/g) || []).slice(0, 4).join(','));
    }
  }
})();
