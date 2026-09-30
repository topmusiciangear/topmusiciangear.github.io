const fs = require('fs');
const cases = [
  { name: 'Revstar 464', pages: ['guides/best-beginner-electric-guitar.html', 'guides/best-beginner-electric-guitar_es.html'],
    toks: ['GIT0058591', '4PBW', 'yamaha-revstar-element-rse20-black', '813079'],
    prices: { ms: '\u20ac479', g4m: '\u00a3409', and: '\u00a3399' },
    olds: ['\u00a3412', '$439'], img: '813079' },
  { name: 'C40 459', pages: ['guides/beginner-guitar.html', 'guides/beginner-guitar_es.html'],
    toks: ['GIT0000636', 'yamaha-c40ii-nylon-classical-guitar'],
    prices: { ms: '\u20ac129', and: '\u00a3129' },
    olds: [] }
];
for (const c of cases) {
  for (const f of c.pages) {
    const g = fs.readFileSync(f, 'utf8');
    const line = ['   ' + f.replace('guides/', '').padEnd(42)];
    line.push('tokens: ' + c.toks.map(t => (g.includes(t) ? '+' : 'X') + t).join(' '));
    line.push('precios: ' + Object.entries(c.prices).map(([k, v]) => (g.includes("data-price='" + v + "'") ? '+' : 'X') + k + '=' + v).join(' '));
    if (c.olds.length) line.push('viejos: ' + c.olds.map(v => (g.includes("data-price='" + v + "'") ? 'X' : 'ok') + v).join(' '));
    if (c.img) line.push('imagen nueva: ' + (g.includes(c.img) ? 'si' : 'NO'));
    line.push('fila MS no "No disponible": ' + !/data-store="musicstore"[^>]*>\s*(?:No disponible|Not Available)/.test(g));
    console.log('== ' + c.name);
    console.log(line.join('\n'));
  }
}
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const id of [464, 459]) {
  const p = P.find(x => x.id === id);
  console.log('\n' + id + ' ' + p.title + ' | canonico ' + p.price + ' | exclude ' + JSON.stringify(p.excludeStores));
  console.log('   img ' + p.img);
  console.log('   MS   ' + p.stores.musicstore);
}
