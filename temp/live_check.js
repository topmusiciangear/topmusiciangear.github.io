const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = ['budget-mics', 'wireless-lapel-mics', 'best-mic-for-podcasting', 'stage-mics'];
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const m = /91: \{[\s\S]{0,320}?\n  \},/.exec(t);
  console.log(m ? m[0] : 'id 91 block NOT FOUND');
  const c = s => (t.match(s) || []).length;
  console.log('new 595.00=' + c(/595\.00/g) + ' 539.00=' + c(/539\.00/g) + ' | old 504.00=' + c(/"£504\.00"/g) + ' 635.00=' + c(/635\.00/g));
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const cc = s => (h.match(s) || []).length;
      console.log('--- ' + g + lang + ': 595.00=' + cc(/595\.00/g) + ' 539.00=' + cc(/539\.00/g) + ' | old 504.00=' + cc(/504\.00/g) + ' 635.00=' + cc(/635\.00/g));
    }
  }
})();
