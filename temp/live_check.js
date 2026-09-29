const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = ['budget-mics', 'best-mic-for-podcasting', 'mics-for-creators', 'stage-mics', 'usb-mics'];
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const c = s => (t.match(s) || []).length;
  const checks = [
    ['AT2020 82.60', /82\.60/g, 'old 80.60', /"£80\.60"/g],
    ['C01 77.00', /77\.00/g, 'old 56.10', /56\.10/g],
    ['AT2035 166.00', /"£166\.00"/g, 'old 166.50', /166\.50/g],
    ['AT2035 179.00', /179\.00/g, 'old 150.42', /150\.42/g]
  ];
  checks.forEach(([n, re, on, ore]) => console.log('  ' + n + '=' + c(re) + '  |  ' + on + '=' + c(ore)));
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const cc = s => (h.match(s) || []).length;
      console.log('--- ' + g + lang + ': 82.60=' + cc(/82\.60/g) + ' 77.00=' + cc(/77\.00/g) + ' 166.00=' + cc(/"£166\.00"|>£166\.00</g) + ' | old 80.60=' + cc(/80\.60/g) + ' 56.10=' + cc(/56\.10/g) + ' 166.50=' + cc(/166\.50/g) + ' 150.42=' + cc(/150\.42/g));
    }
  }
})();
