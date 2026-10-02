const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const idx = t.indexOf('550:');
if (idx === -1) { console.log('Not found'); process.exit(0); }
let d = 0, q = null, i = idx;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
t = t.slice(0, idx) + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
console.log('Prices 550 removed from build-guides.js');