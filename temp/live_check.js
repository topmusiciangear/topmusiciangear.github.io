const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const ID = process.argv[2] || '209';
const NEEDLES = (process.argv[3] || '1,199.00').split(',');
const GUIDES = (process.argv[4] || 'best-instrument-mics').split(',');
(async () => {
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  const m = new RegExp('(^|[^0-9])' + ID + ': \\{[\\s\\S]{0,300}?\\n  \\},', 'm').exec(t);
  console.log(m ? m[0].replace(/^[^0-9]+/, '') : 'id ' + ID + ' NOT FOUND');
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      if (h.indexOf('OC818') === -1 && h.indexOf(ID + ': {') === -1 && h.indexOf('"' + ID + '"') === -1) { console.log('--- ' + g + lang + ': (product not on page)'); continue; }
      const cc = s => (h.match(s) || []).length;
      const counts = NEEDLES.map(n => n + '=' + cc(new RegExp(n.replace(/[,.]/g, c => '\\' + c), 'g'))).join(' ');
      console.log('--- ' + g + lang + ': ' + counts + ' | art-REC0014389=' + cc(/art-REC0014389-000/g) + ' | awin63816=' + cc(/awinmid=63816/g));
    }
  }
})();
