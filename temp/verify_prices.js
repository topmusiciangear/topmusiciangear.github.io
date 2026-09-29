// Scans all generated guide pages for shop-button price rendering.
// Prices are rendered as <span class='shop-price' data-price='AMOUNT'>
// <span style="...italic">Approx.</span> AMOUNT</span>
const fs = require('fs');
const dir = 'guides';
const LABEL = '<span style="font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">';
let pages = 0;
let approx = 0, aprox = 0, cells = 0, cellsPrimary = 0, cellsRow = 0;
const badDecimal = [];    // data-price with decimals
const badThousands = [];  // 4+ digits without a thousands comma
const badLabel = [];      // cell whose Approx. label is missing or wrongly styled
const badAmount = [];     // label/amount mismatch or non-canonical amount
const checkPriceLeak = [];
const strayCurrency = [];  // price markup outside .shop-price inside a price span

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  pages++;
  const isEs = /_es\.html$/.test(f);
  const label = isEs ? 'Aprox.' : 'Approx.';

  const re = /<span class='shop-price' data-price='([^']*)'>(<span style='([^']*)'>)([^<]*)<\/span>\s*([^<]*)<\/span>/g;
  // Map the byte range of every primary (blue) button so its label is checked white.
  const primaryRanges = [];
  let pr0 = c.indexOf('class="shop-btn-primary"');
  while (pr0 !== -1) {
    const pr1 = c.indexOf('</a>', pr0);
    primaryRanges.push([pr0, pr1 === -1 ? c.length : pr1]);
    pr0 = c.indexOf('class="shop-btn-primary"', pr1 === -1 ? c.length : pr1 + 4);
  }
  const isPrimary = (i) => primaryRanges.some(([a, b]) => i >= a && i <= b);
  let m;
  while ((m = re.exec(c))) {
    cells++;
    const amount = m[1], labelSpan = m[2], labelStyle = m[3], labelTxt = m[4], tail = m[5];
    const onPrimary = isPrimary(m.index);
    if (onPrimary) cellsPrimary++; else cellsRow++;
    if (amount !== tail.trim()) {
      badAmount.push(f + ' :: data-price=' + JSON.stringify(amount) + ' label=' + JSON.stringify(labelTxt) + ' tail=' + JSON.stringify(tail.trim()));
      continue;
    }
    if (labelTxt === 'Approx.') approx++; else if (labelTxt === 'Aprox.') aprox++;
    if (labelTxt !== label) badLabel.push(f + ' :: wrong language label ' + JSON.stringify(labelTxt) + ' on ' + (isEs ? 'ES' : 'EN') + ' page');
    if (labelSpan.indexOf('font-size:12px') === -1) badLabel.push(f + ' :: label span not 12px');
    if (labelSpan.indexOf('font-weight:600') === -1) badLabel.push(f + ' :: label span not semibold');
    if (labelSpan.indexOf('font-style:italic') === -1) badLabel.push(f + ' :: label span not italic');
    const wantColor = onPrimary ? 'color:#ffffff' : 'color:#a8a8a8';
    if (labelStyle.indexOf(wantColor) === -1) {
      badLabel.push(f + ' :: ' + (onPrimary ? 'primary' : 'row') + ' label color wrong, expected ' + wantColor + ' got ' + labelStyle);
    }
    if (/\.\d/.test(amount)) badDecimal.push(f + ' :: ' + JSON.stringify(amount));
    if (!/^[$£€]\d{1,3}(,\d{3})*$/.test(amount)) badThousands.push(f + ' :: non-canonical ' + JSON.stringify(amount));
  }

  // Amazon/Reverb labels must stay outside the .shop-price wrapper
  const leak = c.match(/<span class='shop-price' data-price='(Check price|Verificar precio)'/g);
  if (leak) checkPriceLeak.push(f);

  // Any price span that still contains a raw currency amount NOT inside shop-price
  const priceSpan = /<span style="font-weight:700;color:(?:#fff|#a8a8a8)">([\s\S]{0,220}?)<\/span>/g;
  let pm;
  while ((pm = priceSpan.exec(c))) {
    const seg = pm[1];
    const amounts = seg.match(/[$£€][\d,]+(?:\.\d+)?/g) || [];
    for (const a of amounts) {
      if (seg.indexOf("class='shop-price'") === -1) strayCurrency.push(f + ' :: ' + JSON.stringify(seg.slice(0, 120)));
    }
  }
}
console.log('pages scanned:', pages);
console.log('price cells:', cells, '| primary (white label):', cellsPrimary, '| rows (gray label):', cellsRow);
console.log('Approx. =', approx, '| Aprox. =', aprox, '| total =', approx + aprox);
console.log('decimals still present:', badDecimal.length);
badDecimal.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('non-canonical amounts (thousands rule):', badThousands.length);
badThousands.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('label style/language problems:', badLabel.length);
badLabel.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('label/amount mismatches:', badAmount.length);
badAmount.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('currency amount outside .shop-price:', new Set(strayCurrency).size);
Array.from(new Set(strayCurrency)).slice(0, 8).forEach(x => console.log('   ' + x));
console.log('Check-price labels wrapped as price:', new Set(checkPriceLeak).size);
const ok = !badDecimal.length && !badThousands.length && !badLabel.length && !badAmount.length && !strayCurrency.length && !checkPriceLeak.length && cells > 0 && (approx + aprox) === cells && cellsPrimary > 0 && cellsRow > 0;
console.log(ok ? '\n=== ALL PAGES OK ===' : '\n=== PROBLEMS ===');
