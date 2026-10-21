const { execSync } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 30; i++) {
    const b = JSON.parse(execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' }));
    console.log('Pages:', b.status, String(b.commit).slice(0, 10));
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }

  const base = 'https://topmusiciangear.com/';
  for (const f of ['guides/monitor-setup.html', 'guides/monitor-setup_es.html']) {
    const s = await (await fetch(base + f, { cache: 'no-store' })).text();
    console.log('\n### ' + f + ' (' + s.length + ' bytes)');
    const re = /<h2[^>]*class="[^"]*guide-section-heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/g;
    let m, i = 0;
    while ((m = re.exec(s))) console.log('  ' + (i++) + '. ' + m[1].replace(/<[^>]+>/g, '').trim());
    const checks = [
      ['avisos', /Compatibility Warnings|avisos de compatibilidad/i],
      ['cables HS8', /No audio cables ship|No incluye cables de audio/],
      ['K&M base plana', /flat base|base plana/],
      ['latencia Sonarworks', /bypass it while you track|desactívalo mientras grabas/],
      ['UMIK USB', /plugs straight into the computer|se conecta directo al ordenador/],
      ['veredicto combinación', /No single product wins|Aquí no gana un solo producto/],
      ['tabla sin unidades', /Monitor Stands<\/th>/],
      ['UMIK calibrado', /±1 dB calibrated|±1 dB calibrado/],
      ['MS-100 midfield', /Heavy Midfield|midfield pesados/],
      ['FAQ 30°', /30° toward your head|30° hacia tu cabeza/]
    ];
    for (const [n, re2] of checks) console.log('  ' + (re2.test(s) ? 'OK   ' : 'FALLA') + ' ' + n);
  }
})();
