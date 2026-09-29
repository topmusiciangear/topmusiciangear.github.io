const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = 'precision-vs-jazz,fender-bass-guide,budget-bass-like-expensive,beginner-bass-guitars,pro-basses'.split(',');
const CHECKS = [
  { l: 'JZ g4m 804.00', re: /£804\.00/g },
  { l: 'PREC g4m 812.00', re: /£812\.00/g },
  { l: 'and 799.00', re: /£799\.00/g },
  { l: 'ms 899.00', re: /€899\.00/g },
  { l: 'STALE 779.00', re: /£779\.00/g },
  { l: 'STALE 749.00', re: /£749\.00/g },
  { l: 'STALE 713.45', re: /713\.45/g },
  { l: 'STALE 754.62', re: /754\.62/g },
  { l: 'g4m code 6HYY', re: /6HYY/g },
  { l: 'g4m code 6HZM', re: /6HZM/g },
  { l: 'ms art BAS0012732', re: /art-BAS0012732-001/g },
  { l: 'ms art BAS0012731', re: /art-BAS0012731-004/g },
  { l: 'STALE ms art BAS0012912/2911', re: /art-BAS001291[12]-000/g }
];
(async () => {
  await new Promise(r => setTimeout(r, 80000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  try { new Function(t); console.log('LIVE PARSE: OK'); } catch (e) { console.log('LIVE PARSE: FAIL -> ' + e.message); }
  [441, 442].forEach(id => {
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
      const has = /Player II Jazz Bass/.test(h), hasP = /Player II Precision Bass/.test(h);
      if (!has && !hasP) { console.log('--- ' + g + lang + ': (no Player II)'); continue; }
      console.log('--- ' + g + lang + ': ' + CHECKS.map(c => c.l + '=' + (h.match(c.re) || []).length).join(' | '));
    }
  }
})();
