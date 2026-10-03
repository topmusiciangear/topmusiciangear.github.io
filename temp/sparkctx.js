const fs = require('fs');
const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-bass-amps');
const s = JSON.stringify(g);
let i = -1;
while ((i = s.indexOf('Spark', i + 1)) > -1) console.log('...' + s.slice(Math.max(0, i - 70), i + 60).replace(/\s+/g, ' '));
const t = fs.readFileSync('build-guides.js', 'utf8');
const st = t.indexOf('  490: {');
if (st === -1) { console.log('BTN490: NO ENTRY'); return; }
let d = 0, q = null, j = st;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN490: ' + t.slice(st, j + 1).replace(/\s+/g, ' '));