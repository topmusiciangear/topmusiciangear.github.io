const base = 'https://topmusiciangear.com';
const cb = '?cb=' + Date.now();

(async () => {
  const en = await (await fetch(base + '/guides/at2020-vs-p120.html' + cb)).text();
  console.log('EN guide title:', en.includes('Audio-Technica AT2020 vs AKG P120: Budget Condenser'));
  console.log('EN old title gone:', !en.includes('Budget Condenser Duel'));

  for (const p of ['/', '/es/']) {
    const h = await (await fetch(base + p + cb)).text();
    const svg = h.match(/data-fa="magnifying-glass"[^>]*style="([^"]+)"/);
    const inp = h.match(/id="productSearchInput"[^>]*style="([^"]+)"/);
    console.log(p, '| icon white:', !!(svg && svg[1].includes('color:#fff')), '| text white:', !!(inp && inp[1].includes('color:#fff')));
  }

  const css = await (await fetch(base + '/css/style.min.css' + cb)).text();
  console.log('CSS placeholder rule:', css.includes('#productSearchInput::placeholder'));
})();
