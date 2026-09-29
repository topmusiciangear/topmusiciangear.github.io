const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
(async () => {
  await new Promise(r => setTimeout(r, 75000));
  const r = await fetch('https://topmusiciangear.com/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  const i = t.indexOf('\n  103: {');
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  console.log(t.slice(i, t.indexOf('\n  },', i) + 4));
  for (const lang of ['', '_es']) {
    const p = await fetch('https://topmusiciangear.com/guides/best-electric-guitars-2026' + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
    const h = await p.text();
    const c = s => (h.match(s) || []).length;
    console.log('--- ' + p.status + ' ' + lang + ': G4M 3SL4=' + c(/Yamaha-Pacifica-112V-Natural-Satin/g) + ' | viejo 842=' + c(/Pacifica-112-V-Black/g) + ' | 359.99=' + c(/359\.99/g));
  }
})();
