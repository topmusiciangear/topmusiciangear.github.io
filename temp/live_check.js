const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  let ok = true;
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { ok = false; console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const c = s => (t.match(s) || []).length;
  console.log('new: 153.50=' + c(/153\.50/g) + ' 148.25=' + c(/148\.25/g) + ' 139.00=' + c(/139\.00/g) + ' 61.00=' + c(/61\.00/g) + ' 75.00=' + c(/75\.00/g));
  console.log('old: 150.00(e935)=' + c(/"£150\.00"/g) + ' 151.25=' + c(/151\.25/g) + ' 136.00=' + c(/"£136\.00"/g) + ' 93.00=' + c(/"£93\.00"/g) + ' 68.91=' + c(/68\.91/g) + ' 122.00=' + c(/"£122\.00"/g));
  console.log('PodMic MS link REC0014109=' + c(/REC0014109/g) + ' old MIC0007412=' + c(/MIC0007412/g));
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  const m = idx.match(/shop-buttons\.js\?v=[a-z0-9]+/);
  console.log('index.html tag: ' + (m ? m[0] : 'none'));
  for (const g of ['budget-mics', 'stage-mics', 'usb-mics']) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const cc = s => (h.match(s) || []).length;
      console.log('--- ' + g + lang + ': 153.50=' + cc(/153\.50/g) + ' 148.25=' + cc(/148\.25/g) + ' 139.00=' + cc(/139\.00/g) + ' | old 150.00=' + cc(/150\.00/g) + ' 151.25=' + cc(/151\.25/g) + ' 136.00=' + cc(/136\.00/g) + ' 68.91=' + cc(/68\.91/g) + ' 122.00=' + cc(/122\.00/g));
    }
  }
  if (!ok) process.exitCode = 1;
})();
