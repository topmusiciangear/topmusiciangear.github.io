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
  const es = await get('https://topmusiciangear.com/guides/monitor-setup_es.html');
  const en = await get('https://topmusiciangear.com/guides/monitor-setup.html');

  const clean = s => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const verdict = s => {
    const i = s.indexOf('<div class="verdict-text">');
    const j = s.indexOf('</div>', i);
    return clean(s.slice(i, j));
  };

  console.log('\n=== VEREDICTO ES LIVE ===\n' + verdict(es));
  console.log('\n=== VEREDICTO EN LIVE ===\n' + verdict(en));

  const checks = [
    ['ES según tu distribución', es.includes('según tu distribución')],
    ['ES sobre soportes de suelo', es.includes('Monitores sobre soportes de suelo')],
    ['ES campo medio', es.includes('monitores de campo medio mucho más pesados')],
    ['ES presupuesto justo', es.includes('si vas con el presupuesto justo')],
    ['ES evita duplicar gastos', es.includes('Evita duplicar gastos')],
    ['ES sin "micrófono extra"', !es.includes('ningún micrófono extra')],
    ['ES conclusión natural', es.includes('si los monitores no van en el escritorio')],
    ['ES K&M best for', es.includes('Soportes de suelo a la altura del oído')],
    ['EN floor stands', en.includes('Monitors on floor stands')],
    ['EN layout', en.includes('for your layout')],
    ['EN budget tight', en.includes('if your budget is tight')]
  ];
  let fails = 0;
  for (const [n, ok] of checks) { if (!ok) fails++; console.log((ok ? 'OK   ' : 'FALLA') + ' ' + n); }
  console.log('fallos:', fails);

  const furn = await get('https://topmusiciangear.com/guides/studio-furniture_es.html');
  console.log('\nstudio-furniture ES actualizado:', furn.includes('con los monitores sobre soportes de suelo'));
  const pro = await get('https://topmusiciangear.com/guides/pro-monitors_es.html');
  console.log('pro-monitors ES campo medio:', pro.includes('monitores de campo medio'));
})();
