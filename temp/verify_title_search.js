const fs = require('fs');
const en = fs.readFileSync('guides/at2020-vs-p120.html', 'utf8');
console.log('EN title present:', en.includes('Audio-Technica AT2020 vs AKG P120: Budget Condenser'));
console.log('old EN title gone:', !en.includes('Budget Condenser Duel'));
for (const f of ['index.html', 'es/index.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const svg = h.match(/data-fa="magnifying-glass"[^>]*style="([^"]+)"/);
  const inp = h.match(/id="productSearchInput"[^>]*style="([^"]+)"/);
  console.log(f, '| icon:', svg && svg[1].includes('color:#fff'), '| input:', inp && inp[1].includes('color:#fff'));
}
