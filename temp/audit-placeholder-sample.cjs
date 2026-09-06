const fs = require('fs');
const path = require('path');
const files = [];
(function walkA(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walkA(p); else files.push(p); } })('guides');
const RE = /\b(?:lorem|TODO|FIXME|PLACEHOLDER|XXXX)\b/gi;
const byToken = {};
let total = 0;
for (const f of files) {
  let c;
  try { c = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const vis = c.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
  let m;
  while ((m = RE.exec(vis))) {
    total++;
    const tok = m[0].toUpperCase();
    byToken[tok] = byToken[tok] || [];
    if (byToken[tok].length < 3) byToken[tok].push({ file: path.basename(f), ctx: vis.slice(Math.max(0, m.index - 45), m.index + 55).replace(/\s+/g, ' ') });
  }
}
console.log('TOTAL:', total);
for (const tok of Object.keys(byToken)) {
  console.log('\n### ' + tok + ': ' + byToken[tok].length + '+ pres/by file');
  byToken[tok].forEach(s => console.log('  [' + s.file + '] ...' + s.ctx + '...'));
}