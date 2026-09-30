// Verify: nothing lost, only PB entries changed, and PB entries are internally consistent.
// Baseline = the committed build-guides.js (git HEAD), i.e. the state before the PB geo patch.
const fs = require('fs');
const { execSync } = require('child_process');
function loadMap(src, head) {
  const h = src.indexOf(head);
  if (h === -1) throw new Error('TEST_SHOP_BTN not found');
  const open = h + head.length;
  let d = 0, q = null, i = open;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + src.slice(open, i + 1) + ')');
}
const HEAD = 'const TEST_SHOP_BTN = ';
const BASE = execSync('git show HEAD:build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const A = loadMap(BASE, HEAD);
const B = loadMap(fs.readFileSync('build-guides.js', 'utf8'), HEAD);
const ka = Object.keys(A), kb = Object.keys(B);
console.log('keys before/after:', ka.length, kb.length, '| same set:', JSON.stringify(ka) === JSON.stringify(kb));
const changed = ka.filter(k => JSON.stringify(A[k]) !== JSON.stringify(B[k]));
console.log('changed entries:', changed.length);
const pb = changed.filter(k => B[k].pbCur);
console.log('changed WITH pbCur:', pb.length, '| changed WITHOUT pbCur:', changed.filter(k => !B[k].pbCur).map(k => k + (B[k].urls && B[k].urls.pluginboutique ? '(url only)' : '')).join(',') || 'none');
const untouchedBad = ka.filter(k => !B[k].pbCur && JSON.stringify(A[k]) !== JSON.stringify(B[k]));
// consistency of the 38
const GBP = 0.7959;
let errs = [];
pb.forEach(k => {
  const e = B[k];
  const eu = parseFloat(e.prices.pluginboutique.replace(/[^0-9.]/g, ''));
  const us = parseFloat(e.pbCur.us.replace(/[^0-9.]/g, ''));
  const uk = parseFloat(e.pbCur.uk.replace(/[^0-9.]/g, ''));
  if (!e.prices.pluginboutique.startsWith('\u20ac')) errs.push(k + ' canonical not EUR');
  if (!e.pbCur.us.startsWith('$')) errs.push(k + ' us not $');
  if (!e.pbCur.uk.startsWith('\u00a3')) errs.push(k + ' uk not \u00a3');
  if (Math.abs(uk - +(us * GBP).toFixed(2)) > 0.005) errs.push(k + ' gbp != usd*' + GBP + ' (' + us + '->' + uk + ')');
  [e.prices.pluginboutique, e.pbCur.us, e.pbCur.uk].forEach(v => { if (!/^\D[\d,]+\.\d\d$/.test(v)) errs.push(k + ' bad format ' + v); });
});
console.log('consistency errors:', errs.length ? errs : 'none');
const sample = ['28', '60', '119', '121', '374', '382', '387', '473'];
console.log('\n id | canonical EUR   | pbCur.us      | pbCur.uk      | pb url');
sample.forEach(k => {
  const e = B[k];
  console.log(('  ' + k).padEnd(5), (e.prices.pluginboutique + '').padEnd(16), (e.pbCur.us + '').padEnd(14), (e.pbCur.uk + '').padEnd(14), (e.urls && e.urls.pluginboutique || '').slice(-46));
});
console.log('\nids WITHOUT pbCur that have a pluginboutique price:', ka.filter(k => !B[k].pbCur && B[k].prices && B[k].prices.pluginboutique).join(',') || 'none');
