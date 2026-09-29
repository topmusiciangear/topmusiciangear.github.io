// Scans all generated guide pages for shop-button price rendering.
const fs = require('fs');
const dir = 'guides';
let pages = 0;
let approx = 0, aprox = 0;
const badDecimal = [];   // a price with decimals that escaped formatting
const badMissing = [];   // a price without the Approx. prefix
const bareCurrency = []; // currency symbol not preceded by Approx./Aprox.
const checkPriceLeak = [];
const PRICE = /(?:Approx\.|Aprox\.)?\s?[$£€][\d,]+(?:\.\d+)?/g;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  pages++;
  // Only inspect the price spans + primary buttons, not article prose.
  const spans = [];
  const re = /<span style="font-weight:700;color:(?:#fff|#a8a8a8)">([^<]+)<\/span>/g;
  let m;
  while ((m = re.exec(c))) spans.push({ v: m[1], i: m.index });
  const prim = /class="shop-btn-primary"[\s\S]{0,4000}?<\/a>/g;
  let pm;
  while ((pm = prim.exec(c))) {
    const seg = pm[0];
    const x = seg.match(/<\/span><\/span> - ([^<]*)</);
    if (x) spans.push({ v: x[1].trim(), i: pm.index, primary: true });
  }
  for (const s of spans) {
    if (!/[$£€]/.test(s.v)) continue;
    if (/Verificar precio|Check price/.test(s.v)) { checkPriceLeak.push(f); continue; }
    const hasPrefix = /^(Approx\.|Aprox\.)/.test(s.v);
    if (hasPrefix) { if (s.v.startsWith('Approx.')) approx++; else aprox++; }
    else badMissing.push(f + ' :: ' + JSON.stringify(s.v));
    if (/\.\d/.test(s.v)) badDecimal.push(f + ' :: ' + JSON.stringify(s.v));
    if (!hasPrefix) bareCurrency.push(f + ' :: ' + JSON.stringify(s.v));
  }
  // thousands separator rule: 4+ digits must have a comma
  const thou = /\$£€(\d{4,})/g;
  let tm;
  while ((tm = thou.exec(c))) {
    const seg = c.slice(Math.max(0, tm.index - 20), tm.index + 20);
    if (/(Approx\.|Aprox\.)/.test(seg)) bareCurrency.push(f + ' MISSING COMMA :: ' + JSON.stringify(seg));
  }
}
console.log('pages scanned:', pages);
console.log('prices rendered: Approx. =', approx, '| Aprox. =', aprox, '| total =', approx + aprox);
console.log('decimals still present:', badDecimal.length);
badDecimal.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('missing Approx./Aprox. prefix:', badMissing.length);
badMissing.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('thousands-separator issues:', bareCurrency.length);
bareCurrency.slice(0, 8).forEach(x => console.log('   ' + x));
console.log('Check-price labels caught as price:', new Set(checkPriceLeak).size);
const ok = !badDecimal.length && !badMissing.length && !bareCurrency.length && (approx + aprox) > 0;
console.log(ok ? '\n=== ALL PAGES OK ===' : '\n=== PROBLEMS ===');
