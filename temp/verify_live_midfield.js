const { execSync } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 40; i++) {
    const b = JSON.parse(execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' }));
    console.log('Pages:', b.status, String(b.commit).slice(0, 10));
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }
  const es = await (await fetch('https://topmusiciangear.com/guides/monitor-setup_es.html', { cache: 'no-store' })).text();
  console.log('\nmidfield en ES live:', (es.match(/midfield/gi) || []).length);
  console.log('campo medio live:', (es.match(/campo medio/gi) || []).length);
  console.log('pros MS-100 live:', es.includes('aguantan monitores de campo medio pesados'));
  console.log('veredicto live:', es.includes('según tu distribución'));
  console.log('soportes de suelo live:', es.includes('Monitores sobre soportes de suelo'));
})();
