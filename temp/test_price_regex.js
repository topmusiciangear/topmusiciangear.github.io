// Validates the geo-swap price regexes against real rendered HTML.
const re = /- ((?:Approx[.]|Aprox[.])? ?[$£€][0-9.,]+)/;
const reHol = /- (?:Approx[.]|Aprox[.])? ?[$£€][0-9.,]+/;

const samples = [
  'Buy at <span>zZounds</span> - Approx. $439',
  'Buy at <span>Gear4music</span> - Approx. £381',
  'Comprar en <span>zZounds</span> - Aprox. €398',
  'Buy at <span>Music Store</span> - Approx. $1,839',
  'Buy at <span>zZounds</span> - Approx. $1,000'
  // NOTE: the " - " separator is always present; prices are rendered as
  // `'- ' + pPrice` in shopButtonsTest, so no bare-prefix case can occur.
];
let fail = 0;
for (const s of samples) {
  const m = s.match(re);
  if (!m) { fail++; console.log('FAIL  ' + s); continue; }
  const expected = s.slice(s.lastIndexOf('- ') + 2);
  const ok = m[1] === expected;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} captured ${JSON.stringify(m[1])} (expected ${JSON.stringify(expected)})`);
}
// holly replace
const hol = 'Buy at <span>Hollyland</span> - Approx. €1,332';
const out = hol.replace(reHol, '- Aprox. €1,100');
console.log((out === 'Buy at <span>Hollyland</span> - Aprox. €1,100' ? 'ok  ' : 'FAIL') + ' holly replace -> ' + out);
if (!out.endsWith('- Aprox. €1,100')) fail++;
// must NOT match non-price text
const noPrice = 'Buy at <span>zZounds</span> - Verificar precio';
if (noPrice.match(re)) { fail++; console.log('FAIL matched non-price text'); }
else console.log('ok   does not match "Verificar precio"');
console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
