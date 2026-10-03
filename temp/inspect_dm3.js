const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  411: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN411: ' + t.slice(i, j + 1).replace(/\s+/g, ' '));
const G = require('../data/guides.json');
G.forEach(g => {
  const s = JSON.stringify(g);
  if (s.indexOf('DM3 Standard') > -1) {
    const inSecs = (g.sections || []).some(x => (x.products || []).includes(411));
    console.log(g.id, 'DM3-Standard x' + (s.split('DM3 Standard').length - 1), 'has411:' + inSecs);
  }
});