const { execSync } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 40; i++) {
    const b = JSON.parse(execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' }));
    console.log('Pages:', b.status, String(b.commit).slice(0, 10));
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }

  const get = async u => (await fetch(u, { cache: 'no-store' })).text();
  const pages = [
    'guides/monitor-setup.html', 'guides/monitor-setup_es.html',
    'guides/best-monitors.html', 'guides/best-monitors_es.html',
    'guides/starter-studio_es.html'
  ];

  for (const f of pages) {
    const s = await get('https://topmusiciangear.com/' + f);
    const isEs = /_es\.html$/.test(f);
    const titles = [...s.matchAll(/guide-product-card-title">([^<]+)</g)].map(m => m[1]);
    const bad = titles.filter(t => isEs
      ? (/\((each|pair|cada uno|cada una)\)/i.test(t) || /\(par\)/.test(t) || /\(unidad\)/.test(t))
      : (/\((unidad|par|cada uno|cada una)\)/i.test(t) || /\(each\)|\(pair\)/.test(t)));
    console.log('\n' + f + ' | tarjetas: ' + titles.length + ' | mal: ' + bad.length);
    titles.slice(0, 8).forEach(t => console.log('   ' + t));
    if (bad.length) console.log('   MAL: ' + bad.join(' / '));
  }
})();
