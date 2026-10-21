const { execSync } = require('child_process');

async function pagesStatus() {
  const out = execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' });
  return JSON.parse(out);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 30; i++) {
    const b = await pagesStatus();
    console.log('estado Pages:', b.status, '(commit ' + String(b.commit).slice(0, 10) + ')');
    if (b.status === 'built' || b.status === 'errored') break;
    await sleep(15000);
  }

  const base = 'https://topmusiciangear.com/';

  // 1) catalogo publicado
  const prods = await (await fetch(base + 'data/products.json', { cache: 'no-store' })).json();
  const p = prods.find(x => x.id === 650);
  console.log('\n650 live:', p.title, '|', p.img, '|', p.price);

  // 2) imagenes nuevas
  for (const f of ['d00aa6812b', 'cd5647866e', '162a2a386a']) {
    const r = await fetch(base + 'img/products/' + f + '.webp', { method: 'GET', cache: 'no-store' });
    const len = (await r.arrayBuffer()).byteLength;
    console.log(f + '.webp ->', r.status, r.headers.get('content-type'), Math.round(len / 1024) + ' KB');
  }

  // 3) paginas
  for (const [page, needle, avoid] of [
    ['guides/monitor-setup.html', 'MoPAD-XL', 'AURMOPAD'],
    ['guides/monitor-setup_es.html', 'MoPAD-XL', 'AURMOPAD'],
    ['guides/studio-subwoofers-setup.html', 'cd5647866e', '59e1c43c7e'],
    ['guides/studio-subwoofers-setup_es.html', 'cd5647866e', '59e1c43c7e']
  ]) {
    const t = await (await fetch(base + page, { cache: 'no-store' })).text();
    console.log(page + ' -> ' + needle + ':' + t.includes(needle) + ' | viejo:' + t.includes(avoid) + ' | bytes:' + t.length);
  }
})();
