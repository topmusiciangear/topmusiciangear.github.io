const { execSync } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 30; i++) {
    const b = JSON.parse(execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' }));
    console.log('Pages:', b.status, String(b.commit).slice(0, 10));
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }
  const s = await (await fetch('https://topmusiciangear.com/guides/monitor-setup_es.html', { cache: 'no-store' })).text();
  const i = s.indexOf('<div class="verdict-text">');
  const j = s.indexOf('</div>', i);
  console.log('\n' + s.slice(i, j).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 340));
  console.log('\nvieja frase presente:', s.includes('dónde vivan tus altavoces'));
})();
