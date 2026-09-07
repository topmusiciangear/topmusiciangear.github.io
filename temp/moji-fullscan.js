const fs = require('fs');
const path = require('path');
const root = process.cwd();
const skipDirs = new Set(['.git', 'node_modules', 'temp', '.github']);
const pats = [/â€¦/g, /â€(?:[™“”¢–—]|‘|’)/g, /â˜…/g, /âˆ’/g, /ðŸ/g, /Ã(?:[±¤¡©³ª|·¶¸º¼½¾¿]|)/g, /Â[^\x00-\x7F]/g, /\uFFFD/g];
const hits = [];
function walk(d) {
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    if (e.isDirectory()) { if (!skipDirs.has(e.name)) walk(path.join(d, e.name)); continue; }
    if (!/\.(js|json|html)$/i.test(e.name)) continue;
    const fp = path.join(d, e.name);
    const s = fs.readFileSync(fp, 'utf8');
    let c = 0; const which = [];
    for (const p of pats) { const m = s.match(p); if (m) { c += m.length; which.push(p.source); } }
    if (c) hits.push({ fp: fp.replace(/\\/g, '/'), n: c, pat: which.slice(0, 4).join(' ') });
  }
}
walk('.');
console.log('MOJIBAKE SCAN TOTAL FILES:', hits.length);
hits.sort((a, b) => b.n - a.n);
for (const h of hits.slice(0, 60)) console.log(h.n, h.pat, h.fp);