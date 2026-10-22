const base = 'https://topmusiciangear.com';
const cb = '?cb=' + Date.now();

(async () => {
  for (const p of ['/guides/at2020-vs-p120.html', '/guides/at2020-vs-p120_es.html', '/guides/budget-mics.html']) {
    const h = await (await fetch(base + p + cb)).text();
    const rules = [...h.matchAll(/[^{}]*guide-product-card-img img[^{}]*\{[^}]*\}/g)].map(m => m[0].replace(/\s+/g, ' '));
    console.log(p);
    for (const r of rules) console.log('  -', r.slice(0, 160));
    console.log('  base contain:', rules.some(r => /^\.guide-product-card-img img\{[^}]*object-fit:contain/.test(r)));
  }
  const css = await (await fetch(base + '/css/style.min.css' + cb)).text();
  const rules = [...css.matchAll(/\.guide-product-card-img img\{[^}]*\}/g)].map(m => m[0]);
  console.log('live style.min.css:');
  for (const r of rules) console.log('  -', r.slice(0, 160));
  console.log('  base contain:', rules.some(r => /^\.guide-product-card-img img\{[^}]*object-fit:contain/.test(r)));
})();
