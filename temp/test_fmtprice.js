const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const s = src.indexOf('function fmtPrice(');
const e = src.indexOf('\nfunction ', s + 10);
const fmtPrice = eval('(' + src.substring(s, e) + ')');

const cases = [
  // [input, expected EN]
  ['$439.00', 'Approx. $439'],
  ['£381.50', 'Approx. £381'],
  ['$1,839.99', 'Approx. $1,839'],
  ['$18.50', 'Approx. $18'],
  ['$0.99', 'Approx. $0'],
  ['€398.00', 'Approx. €398'],
  ['$3,750.00', 'Approx. $3,750'],
  ['$150.40', 'Approx. $150'],
  ['$999.00', 'Approx. $999'],
  ['$1000.00', 'Approx. $1,000'],
  ['$1234.56', 'Approx. $1,234'],
  ['$108.99', 'Approx. $108'],
  ['$53.95', 'Approx. $53'],
  ['$1249.00', 'Approx. $1,249'],
  ['$45.00', 'Approx. $45'],
  ['$4,499.99', 'Approx. $4,499'],
  // pass-through / defensive
  ['', ''],
  [null, ''],
  [undefined, ''],
  ['Verificar precio', 'Verificar precio'],
  ['Check price', 'Check price']
];

let fail = 0;
for (const [inp, exp] of cases) {
  const got = fmtPrice(inp, 'en');
  const gotEs = fmtPrice(inp, 'es');
  const expEs = exp === '' ? '' : exp.replace('Approx.', 'Aprox.');
  const ok = got === exp && gotEs === expEs;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${JSON.stringify(inp)} -> EN ${JSON.stringify(got)} | ES ${JSON.stringify(gotEs)}${ok ? '' : '  (expected EN ' + JSON.stringify(exp) + ' / ES ' + JSON.stringify(expEs) + ')'}`);
}
console.log(fail ? `\n${fail} FAILURES` : '\nALL PASS');

// exhaustive over real data
const bs = src.indexOf('const TEST_SHOP_BTN = {');
const be = src.indexOf('\n};', bs);
const MAP = eval('(' + src.slice(bs + 'const TEST_SHOP_BTN ='.length, be + 2) + ')');
let n = 0, changed = 0, alreadyOk = 0, bad = [];
const walk = (o, id) => {
  if (!o || typeof o !== 'object') return;
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string' && /[$£€]/.test(v)) {
      n++;
      const out = fmtPrice(v, 'en');
      if (!/^Approx\. [$£€]\d{1,3}(,\d{3})*$/.test(out)) { bad.push(id + '.' + k + ' = ' + v + ' -> ' + out); continue; }
      if (out === v) alreadyOk++; else changed++;
    } else if (v && typeof v === 'object') walk(v, id + '.' + k);
  }
};
for (const [id, cfg] of Object.entries(MAP)) { walk(cfg.prices, id); walk(cfg.holly, id); }
console.log(`\nreal price strings: ${n} | reformatted: ${changed} | already correct: ${alreadyOk} | malformed: ${bad.length}`);
bad.slice(0, 10).forEach(b => console.log('  ' + b));
