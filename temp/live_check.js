const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = (process.argv[2] || 'best-instrument-mics').split(',');
const CHECKS = [
  { label: 'e604 zz $159.00', re: /\$159\.00/g },
  { label: 'e604 and £112.00', re: /£112\.00/g },
  { label: 'e604 g4m £111.00', re: /£111\.00/g },
  { label: 'e604 ms €139.00', re: /€139\.00/g },
  { label: 'Beta52A g4m £196.00', re: /£196\.00/g },
  { label: 'BETA52A STALE £193.50', re: /£193\.50/g },
  { label: 'e604 STALE 429/295/360', re: /\$429\.00|£295\.00|€360\.00/g },
  { label: 'e604 zz link item--SENE604', re: /item--SENE604/g },
  { label: 'e604 ms art-PAH0000297', re: /art-PAH0000297-000/g },
  { label: 'STALE 3-Pack', re: /3-Pack|3-pack/gi }
];
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  [214, 212].forEach(id => {
    const m = new RegExp('(^|[^0-9])' + id + ': \\{[\\s\\S]{0,300}?\\n  \\},', 'm').exec(t);
    console.log(m ? m[0].replace(/^[^0-9]+/, '') : 'id ' + id + ' NOT FOUND');
  });
  const idx = await (await fetch(BASE + '/index.html?v=' + Date.now(), { headers: { 'User-Agent': UA } })).text();
  console.log('index.html: ' + ((idx.match(/shop-buttons\.js\?v=[a-z0-9]+/) || ['none'])[0]));
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const out = CHECKS.map(c => c.label + '=' + (h.match(c.re) || []).length).join(' | ');
      console.log('--- ' + g + lang + ': ' + out);
    }
  }
})();
