const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = ['wireless-lapel-mics', 'budget-mics', 'best-mic-for-podcasting'];
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const m = /93: \{[\s\S]{0,300}?\n  \},/.exec(t);
  console.log(m ? m[0] : 'id 93 NOT FOUND');
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const cc = s => (h.match(s) || []).length;
      console.log('--- ' + g + lang + ': 755.00=' + cc(/755\.00/g) + ' 759.00=' + cc(/759\.00/g) + ' 1,099.00=' + cc(/1,099\.00/g) + ' | old 845.00=' + cc(/845\.00/g) + ' 999.00=' + cc(/\$999\.00/g) + ' | andertons-len=' + cc(/ew-d-me2-835-s-set-lavalier/g));
    }
  }
})();
