// Live check of the styled Approx./Aprox. price cells in production.
const pages = [
  ['EN', 'https://topmusiciangear.com/guides/studio-furniture.html', 'Approx.'],
  ['ES', 'https://topmusiciangear.com/guides/studio-furniture_es.html', 'Aprox.']
];
const STYLE = 'font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic';
const CELL = /<span class='shop-price' data-price='([^']*)'>(<span style='[^']*'>)([^<]*)<\/span>\s*([^<]*)<\/span>/g;
(async () => {
  let allOk = true;
  for (const [tag, url, label] of pages) {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const c = await r.text();
    const cells = [...c.matchAll(CELL)].map(m => ({ amount: m[1], style: m[2], label: m[3], tail: m[4] }));
    const other = tag === 'EN' ? 'Aprox.' : 'Approx.';
    const wrongLang = cells.filter(x => x.label !== label).length;
    const badStyle = cells.filter(x => x.style.indexOf(STYLE) === -1).length;
    const decimals = cells.filter(x => /\.\d/.test(x.amount)).length;
    const mismatch = cells.filter(x => x.amount !== x.tail.trim()).length;
    const noComma = cells.filter(x => !/^[$£€]\d{1,3}(,\d{3})*$/.test(x.amount)).length;
    const leak = (c.match(/<span class='shop-price' data-price='(Check price|Verificar precio)'/g) || []).length;
    const ok = r.status === 200 && cells.length > 0 && !wrongLang && !badStyle && !decimals && !mismatch && !noComma && !leak;
    if (!ok) allOk = false;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${tag} ${r.status} cells=${cells.length} wrongLang=${wrongLang} badStyle=${badStyle} decimals=${decimals} mismatch=${mismatch} noComma=${noComma} checkPriceLeak=${leak}`);
    console.log('     ' + cells.slice(0, 8).map(x => x.label + ' ' + x.amount).join(' | '));
  }
  console.log(allOk ? '\n=== LIVE OK ===' : '\n=== LIVE PROBLEMS ===');
})();
