const { execSync } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function status() {
  return JSON.parse(execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' }));
}

(async () => {
  for (let i = 0; i < 30; i++) {
    const b = await status();
    console.log('Pages:', b.status, String(b.commit).slice(0, 10));
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }

  const base = 'https://topmusiciangear.com/';
  const prods = await (await fetch(base + 'data/products.json', { cache: 'no-store' })).json();
  for (const id of [646, 651]) {
    const p = prods.find(x => x.id === id);
    console.log(id + ' | ' + p.title + ' | ' + p.title_es);
  }

  for (const [page, checks] of [
    ['guides/monitor-setup.html', ['IsoAcoustics ISO-200 Studio Monitor Stands (Pair)', 'Ultimate Support MS-100 Studio Monitor Stands (Pair)']],
    ['guides/monitor-setup_es.html', ['Soportes de monitor IsoAcoustics ISO-200 (par)', 'Soportes de monitor Ultimate Support MS-100 (par)']]
  ]) {
    const t = await (await fetch(base + page, { cache: 'no-store' })).text();
    console.log('\n' + page + ' bytes ' + t.length);
    for (const c of checks) console.log('  ' + c + ': ' + t.includes(c));
    console.log('  nombres viejos: ' + /ISO-200 \(Pair\)|MS-100 \(Pair\)|ISO-200 \(Par\)|MS-100 \(Par\)/.test(t));
    console.log('  score 9.4: ' + t.includes('9.4') + ' | 8.7: ' + t.includes('8.7'));
  }
})();
