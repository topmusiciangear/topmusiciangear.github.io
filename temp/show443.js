const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  443: {');
if (start === -1) { console.log('NO BTN 443'); return; }
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN443: ' + t.slice(start, i + 1).replace(/\s+/g, ' '));