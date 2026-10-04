const fs = require('fs');
function loadBTN() {
  const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
  const bs = src.indexOf('{', src.indexOf('TEST_SHOP_BTN'));
  let d = 0, q = null, i = bs;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + src.slice(bs, i + 1) + ')');
}
const BTN = loadBTN();
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const HOLLY = new Set([504, 505, 506, 507, 508, 509, 510, 511]);
function usd(s) {
  if (!s) return null;
  const m = String(s).match(/^\$\s*([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : null;
}
function fmt(n) {
  const s = n % 1 === 0 ? String(n) : n.toFixed(2);
  return '$' + s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function rangeFor(id) {
  const cfg = BTN[String(id)] || BTN[id] || {};
  const pr = cfg.prices || {};
  const pts = [usd(pr.amazon), usd(pr.zzounds)].filter(v => v != null);
  if (!pts.length && !HOLLY.has(Number(id))) {
    const p = P.find(x => x.id === Number(id));
    if (p && p.price) pts.push(Number(p.price));
  }
  if (!pts.length) return null;
  const lo = Math.min(...pts), hi = Math.max(...pts);
  return lo === hi ? '~' + fmt(lo) : fmt(lo) + '–' + fmt(hi);
}
function norm(s) {
  return (s || '').toLowerCase()
    .replace(/generation/g, 'gen').replace(/microphone/g, 'mic').replace(/series/g, '')
    .replace(/[^a-z0-9]/g, '');
}
const byNorm = {};
P.forEach(p => { byNorm[norm(p.title)] = p.id; });
function mapId(t) {
  const n = norm(t);
  if (byNorm[n]) return byNorm[n];
  let c = P.filter(p => norm(p.title).startsWith(n) || n.startsWith(norm(p.title)));
  if (c.length === 1) return c[0].id;
  if (n.length >= 4) {
    c = P.filter(p => norm(p.title).includes(n) || n.includes(norm(p.title)));
    if (c.length === 1) return c[0].id;
  }
  return null;
}
module.exports = { BTN, P, rangeFor, mapId };