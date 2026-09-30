// Verify: nothing lost, only PB entries changed, and PB entries are internally consistent.
// Baseline = d556fa5ed5, the commit immediately before the Plugin Boutique geo patch.
// Hardcoded so the check stays meaningful after this file is committed.
const fs = require('fs');
const { execSync } = require('child_process');
const BASELINE = 'd556fa5ed5';
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
const BASE = execSync('git show ' + BASELINE + ':build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const A = loadMap(BASE, HEAD);
const B = loadMap(fs.readFileSync('build-guides.js', 'utf8'), HEAD);
const ka = Object.keys(A), kb = Object.keys(B);
console.log('keys before/after:', ka.length, kb.length, '| same set:', JSON.stringify(ka) === JSON.stringify(kb));
const changed = ka.filter(k => JSON.stringify(A[k]) !== JSON.stringify(B[k]));
console.log('changed entries:', changed.length);
const pb = changed.filter(k => B[k].pbCur);
console.log('changed WITH pbCur:', pb.length, '| changed WITHOUT pbCur:', changed.filter(k => !B[k].pbCur).map(k => k + (B[k].urls && B[k].urls.pluginboutique ? '(url only)' : '')).join(',') || 'none');
const untouchedBad = ka.filter(k => !B[k].pbCur && JSON.stringify(A[k]) !== JSON.stringify(B[k]));

// Lista blanca de cambios NO-PB autorizados por el usuario (30/09/2026).
// id -> { campo: [valor antes, valor despues] }. Cualquier otro cambio no-PB
// respecto al baseline es un fallo: el patch PB no puede tocar otras entradas y
// las correcciones de precio deben declararse aqui una a una.
const APPROVED_NON_PB = {
  '53':  { 'prices.gear4music': ['£178.75', '£175.00'] },
  '54':  { 'prices.gear4music': ['£213.50', '£226.00'] },
  '155': { 'prices.musicstore': ['€1,775.63', undefined] },
  '156': { 'prices.musicstore': ['€1,847.90', '€1,799.00'], 'prices.andertons': ['£1,799.00', '£1,599.00'] },
  '157': { 'prices.gear4music': ['£389.00', '£419.00'], 'prices.musicstore': ['€354.12', '€488.00'] },
  '158': { 'prices.musicstore': ['€217.65', '€299.00'] },
  '159': { 'prices.zzounds': ['$419.99', '$450.00'], 'prices.gear4music': ['£399.00', '£397.00'] },
  '160': { 'prices.musicstore': ['€389.00', '€369.00'] },
  '185': { 'prices.andertons': ['£2,049.00', '£2,199.00'], 'prices.gear4music': ['£2,079.00', '£2,165.00'], 'prices.musicstore': ['€1,998.00', '€2,349.00'] },
};
// aplana un nivel: prices.gear4music, urls.musicstore, oos[0]...
function flat(o) {
  const out = {};
  for (const [k, v] of Object.entries(o || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [k2, v2] of Object.entries(v)) out[k + '.' + k2] = v2;
    } else out[k] = Array.isArray(v) ? JSON.stringify(v) : v;
  }
  return out;
}
function diffFields(a, b) {
  const A = flat(a), B = flat(b);
  const out = {};
  for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
    if (JSON.stringify(A[k]) !== JSON.stringify(B[k])) out[k] = [A[k], B[k]];
  }
  return out;
}
const bad = [];
for (const k of untouchedBad) {
  const want = APPROVED_NON_PB[k];
  if (!want) { bad.push(k + ': cambiado sin estar en la lista blanca'); continue; }
  const got = diffFields(A[k], B[k]);
  const gotKeys = Object.keys(got).sort();
  const wantKeys = Object.keys(want).sort();
  if (JSON.stringify(gotKeys) !== JSON.stringify(wantKeys)) {
    bad.push(k + ': campos cambiados ' + JSON.stringify(gotKeys) + ' != autorizado ' + JSON.stringify(wantKeys));
    continue;
  }
  for (const f of wantKeys) {
    const [from, to] = want[f];
    const [gFrom, gTo] = got[f];
    if (gFrom !== from || gTo !== to) {
      bad.push(k + '.' + f + ': ' + JSON.stringify(gFrom) + '->' + JSON.stringify(gTo) + ' != autorizado ' + JSON.stringify(from) + '->' + JSON.stringify(to));
    }
  }
}
console.log('cambios no-PB autorizados:', untouchedBad.length, '/', Object.keys(APPROVED_NON_PB).length,
  '->', untouchedBad.slice().sort().join(',') || 'none');
console.log(bad.length ? 'FALLOS lista blanca:\n  ' + bad.join('\n  ') : 'lista blanca OK (sin cambios no-PB no autorizados)');
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
process.exit(bad.length ? 1 : 0);
