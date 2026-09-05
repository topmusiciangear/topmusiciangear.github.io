const fs = require('fs');
const s = fs.readFileSync('build-guides.js', 'utf8');
const re = /urls:\{([\s\S]*?)\}/g;
let m;
while ((m = re.exec(s))) {
  const inner = m[1];
  const kv = inner.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
  let hit = false;
  for (const p of kv) {
    const i = p.indexOf(':');
    if (i < 0) { continue; }
    let val = p.slice(i + 1).trim();
    if (/^["']/.test(val)) { val = val.slice(1); }
    if (/^[€£$]/.test(val)) { hit = true; console.log('   [' + p.replace(/\n/g, ' ').slice(0, 80) + ']'); }
  }
  if (hit) {
    const lineNo = s.slice(0, m.index).split('\n').length;
    const before = s.slice(Math.max(0, m.index - 120), m.index).replace(/\n/g, ' ');
    const after = s.slice(m.index, m.index + 260).replace(/\n/g, ' ');
    console.log('LINE', lineNo, '| ...' + before.slice(-90) + ' >> ' + after.slice(0, 120));
  }
}