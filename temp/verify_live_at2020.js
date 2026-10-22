const targets = [
  {
    url: 'https://topmusiciangear.com/guides/at2020-vs-p120.html?cb=' + Date.now(),
    checks: [
      ['AT2020 vs AKG P120: Which Mic Wins?', 'title tag'],
      ['Audio-Technica AT2020 Studio Condenser Microphone', 'AT2020 card EN'],
      ['AKG P120', 'P120 present'],
      ['at2020-vs-p120_es.html', 'hreflang ES'],
    ],
  },
  {
    url: 'https://topmusiciangear.com/guides/at2020-vs-p120_es.html?cb=' + Date.now(),
    checks: [
      ['AT2020 vs AKG P120: ¿cuál elegir?', 'title tag ES'],
      ['Micrófono de condensador de estudio Audio-Technica AT2020', 'AT2020 card ES'],
      ['at2020-vs-p120.html', 'hreflang EN'],
    ],
  },
  {
    url: 'https://topmusiciangear.com/guides/apollo-vs-babyface_es.html?cb=' + Date.now(),
    checks: [
      ['nota: 9.6 sobre 10', 'Apollo score 9.6 aria'],
    ],
  },
];

(async () => {
  for (const t of targets) {
    try {
      const r = await fetch(t.url, { headers: { 'cache-control': 'no-cache' } });
      const h = await r.text();
      console.log('---', r.status, t.url.split('?')[0]);
      for (const [needle, label] of t.checks) {
        console.log((h.includes(needle) ? 'OK   ' : 'FAIL ') + label);
      }
    } catch (e) {
      console.log('ERROR', t.url, e.message);
    }
  }
})();
