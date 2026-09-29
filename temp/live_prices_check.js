// Live check of the styled Approx./Aprox. price cells in production.
// Rows are gray (#a8a8a8) like "Check price"; the blue primary button is white.
const pages = [
  ['EN', 'https://topmusiciangear.com/guides/studio-furniture.html', 'Approx.'],
  ['ES', 'https://topmusiciangear.com/guides/studio-furniture_es.html', 'Aprox.'],
  ['EN-holly', 'https://topmusiciangear.com/guides/wireless-lapel-mics.html', 'Approx.']
];
const TYPO = 'font-size:12px;font-weight:600';
const CELL = /<span class='shop-price' data-price='([^']*)'>(<span style='([^']*)'>)([^<]*)<\/span>\s*([^<]*)<\/span>/g;
(async () => {
  let allOk = true;
  for (const [tag, url, label] of pages) {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const c = await r.text();
    const ranges = [];
    let p0 = c.indexOf('class="shop-btn-primary"');
    while (p0 !== -1) {
      const p1 = c.indexOf('</a>', p0);
      ranges.push([p0, p1 === -1 ? c.length : p1]);
      p0 = c.indexOf('class="shop-btn-primary"', p1 === -1 ? c.length : p1 + 4);
    }
    const inPrimary = (i) => ranges.some(([a, b]) => i >= a && i <= b);
    const cells = [];
    let m;
    while ((m = CELL.exec(c))) {
      cells.push({ amount: m[1], style: m[3], label: m[4], tail: m[5], primary: inPrimary(m.index) });
    }
    const rows = cells.filter(x => !x.primary);
    const prims = cells.filter(x => x.primary);
    const wrongLang = cells.filter(x => x.label !== label).length;
    const badTypo = cells.filter(x => x.style.indexOf(TYPO) === -1 || x.style.indexOf('font-style:italic') === -1).length;
    const badGray = rows.filter(x => x.style.indexOf('color:#a8a8a8') === -1).length;
    const badWhite = prims.filter(x => x.style.indexOf('color:#ffffff') === -1).length;
    const decimals = cells.filter(x => /\.\d/.test(x.amount)).length;
    const mismatch = cells.filter(x => x.amount !== x.tail.trim()).length;
    const noComma = cells.filter(x => !/^[$£€]\d{1,3}(,\d{3})*$/.test(x.amount)).length;
    const leak = (c.match(/<span class='shop-price' data-price='(Check price|Verificar precio)'/g) || []).length;
    const ok = r.status === 200 && cells.length > 0 && !wrongLang && !badTypo && !badGray && !badWhite && !decimals && !mismatch && !noComma && !leak;
    if (!ok) allOk = false;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${tag} ${r.status} cells=${cells.length} (rows=${rows.length} prim=${prims.length}) wrongLang=${wrongLang} badTypo=${badTypo} badGray=${badGray} badWhite=${badWhite} decimals=${decimals} mismatch=${mismatch} noComma=${noComma} leak=${leak}`);
    console.log('     ' + cells.slice(0, 6).map(x => (x.primary ? '[P]' : '[R]') + x.label + ' ' + x.amount).join(' | '));
  }
  console.log(allOk ? '\n=== LIVE OK ===' : '\n=== LIVE PROBLEMS ===');
})();
