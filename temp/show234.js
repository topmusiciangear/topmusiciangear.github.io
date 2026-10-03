const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
[235, 234].forEach(id => {
  const start = t.indexOf('  ' + id + ': {');
  if (start === -1) { console.log(id, 'NO BTN'); return; }
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BTN' + id + ': ' + t.slice(start, i + 1).replace(/\s+/g, ' '));
});