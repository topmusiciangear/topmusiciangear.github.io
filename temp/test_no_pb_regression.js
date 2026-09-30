// Regression guard: the PB geo patch must NOT alter JSON-LD in non-PB guides.
// Baseline = d556fa5ed5, the commit immediately before the Plugin Boutique geo
// patch (the deployed visual-variant commit). Hardcoded on purpose: comparing
// against HEAD would be self-referential after this file is committed.
const { execSync } = require('child_process');
const fs = require('fs');

const BASELINE = 'd556fa5ed5';

const files = [
  'guides/wireless-lapel-mics.html',
  'guides/wireless-intercom-systems.html',
  'guides/best-mic-for-podcasting.html',
  'guides/starter-studio.html',
  'guides/budget-mics.html',
  'guides/xr18-vs-cq18t.html',
  'guides/sm57-vs-sm58.html',
];
const currencies = s => [...s.matchAll(/"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1]).sort().join(',');
const offers = s => [...s.matchAll(/"price"\s*:\s*([\d.]+)[\s\S]{0,200}?"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1] + m[2]).sort().join('|');
// any EUR price cell in the guide body (displayed prices, not JSON-LD)
const eurCells = s => (s.match(/data-price='\u20ac[\d,.]+'/g) || []).sort().join('|');

let bad = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('skip  ' + f + ' (no existe)'); continue; }
  const now = fs.readFileSync(f, 'utf8');
  const before = execSync('git show ' + BASELINE + ':' + f, { encoding: 'utf8', maxBuffer: 1e8 });
  const curSame = currencies(now) === currencies(before);
  const offSame = offers(now) === offers(before);
  const cellsSame = eurCells(now) === eurCells(before);
  const good = curSame && offSame && cellsSame;
  if (!good) bad++;
  console.log((good ? 'ok   ' : 'FAIL ') + f.replace('guides/', '').padEnd(34) +
    ' currencies[' + currencies(now) + '] offers:' + offSame + ' eurCells:' + cellsSame);
  if (!curSame) console.log('       before=[' + currencies(before) + '] after=[' + currencies(now) + ']');
  if (!offSame) console.log('       offer prices changed');
  if (!cellsSame) console.log('       EUR displayed cells changed');
}
console.log(bad ? '\n' + bad + ' REGRESSIONS en guias no-PB' : '\nNO REGRESSION: guias no-PB identicas al baseline (JSON-LD + precios mostrados)');
process.exit(bad ? 1 : 0);
