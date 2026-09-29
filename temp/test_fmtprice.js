const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const extract = (name) => {
  const s = src.indexOf('function ' + name + '(');
  const e = src.indexOf('\nfunction ', s + 10);
  return src.substring(s, e);
};
const fmtPrice = eval('(' + extract('fmtPrice') + ')');
const fmtPricePlain = eval('(' + extract('fmtPricePlain') + ')');

const LABEL_EN = 'Approx.';
const LABEL_ES = 'Aprox.';
const style = (color) => 'font-size:12px;font-weight:600;color:' + color + ';font-style:italic';
const GRAY = '#a8a8a8';   // rows (dark #333 / #262626)
const WHITE = '#ffffff';  // primary button (blue #3b82f6)

const cases = [
  // [input, expected plain EN amount]
  ['$439.00', '$439'],
  ['£381.50', '£381'],
  ['$1,839.99', '$1,839'],
  ['$18.50', '$18'],
  ['$0.99', '$0'],
  ['€398.00', '€398'],
  ['$3,750.00', '$3,750'],
  ['$999.00', '$999'],
  ['$1000.00', '$1,000'],
  ['$1234.56', '$1,234'],
  ['$1249.00', '$1,249'],
  ['$4,499.99', '$4,499'],
  // pass-through / defensive
  ['', ''],
  [null, ''],
  [undefined, ''],
  ['Verificar precio', 'Verificar precio'],
  ['Check price', 'Check price']
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const expectedHtml = (amount, lang, color) =>
  `<span class='shop-price' data-price='${esc(amount)}'>` +
  `<span style='${style(color)}'>${lang === 'es' ? LABEL_ES : LABEL_EN}</span> ` +
  `${amount}</span>`;

let fail = 0;
for (const [inp, amount] of cases) {
  const literal = amount === '' || /Verificar|Check/.test(String(inp));
  const exp = literal ? String(inp || '') : expectedHtml(amount, 'en', GRAY);
  const expEs = literal ? String(inp || '') : expectedHtml(amount, 'es', GRAY);
  const expPri = literal ? String(inp || '') : expectedHtml(amount, 'en', WHITE);
  const got = fmtPrice(inp, 'en');
  const gotEs = fmtPrice(inp, 'es');
  const gotPri = fmtPrice(inp, 'en', true);
  const gotPlain = fmtPricePlain(inp);
  const ok = got === exp && gotEs === expEs && gotPri === expPri && gotPlain === amount;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${JSON.stringify(inp)} -> ${JSON.stringify(got)} | ES ${JSON.stringify(gotEs)} | primary ${JSON.stringify(gotPri)} | plain ${JSON.stringify(gotPlain)}${ok ? '' : '\n     expected EN(row) ' + exp + '\n     expected ES(row) ' + expEs + '\n     expected EN(primary) ' + expPri + '\n     expected plain ' + amount}`);
}
console.log(fail ? `\n${fail} FAILURES` : '\nALL PASS');

// Primary label must be white, row label gray.
{
  const row = fmtPrice('$100', 'en');
  const pri = fmtPrice('$100', 'en', true);
  const chk = (cond, m) => { if (!cond) { fail++; console.log('FAIL ' + m); } else console.log('ok   ' + m); };
  chk(row.indexOf('color:' + GRAY) > -1, 'row label is gray ' + GRAY);
  chk(pri.indexOf('color:' + WHITE) > -1, 'primary label is white ' + WHITE);
  chk(row.indexOf('color:' + WHITE) === -1, 'row label is NOT white');
  chk(pri.indexOf('color:' + GRAY) === -1, 'primary label is NOT gray');
  chk(!row.includes('margin-left:auto') && !pri.includes('margin-left:auto'), 'neither variant steals layout');
}

// exhaustive over real data
const bs = src.indexOf('const TEST_SHOP_BTN = {');
const be = src.indexOf('\n};', bs);
const MAP = eval('(' + src.slice(bs + 'const TEST_SHOP_BTN ='.length, be + 2) + ')');
let n = 0, malformed = [], styleBad = [];
const walk = (o, id) => {
  if (!o || typeof o !== 'object') return;
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string' && /[$£€]/.test(v)) {
      n++;
      const plain = fmtPricePlain(v);
      const out = fmtPrice(v, 'en');
      if (!/^[$£€]\d{1,3}(,\d{3})*$/.test(plain)) { malformed.push(id + '.' + k + ' = ' + v + ' -> ' + plain); continue; }
      if (out !== expectedHtml(plain, 'en', GRAY)) styleBad.push(id + '.' + k);
    } else if (v && typeof v === 'object') walk(v, id + '.' + k);
  }
};
for (const [id, cfg] of Object.entries(MAP)) { walk(cfg.prices, id); walk(cfg.holly, id); }
console.log(`\nreal price strings: ${n} | malformed amounts: ${malformed.length} | bad label markup: ${styleBad.length}`);
malformed.slice(0, 10).forEach(b => console.log('  ' + b));
styleBad.slice(0, 10).forEach(b => console.log('  markup: ' + b));
