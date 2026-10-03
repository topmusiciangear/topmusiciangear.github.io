const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  412: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN 412:', t.slice(i, j + 1));
const G = require('../data/guides.json');
G.forEach(g => {
  const uses = [];
  (g.sections || []).forEach(s => {
    if ((s.products || []).includes(148)) uses.push('sec148:' + (s.heading || '').slice(0, 40));
    if ((s.products || []).includes(412)) uses.push('sec412:' + (s.heading || '').slice(0, 40));
  });
  const f = (g.featuredProducts || []).filter(x => x === 148 || x === 412);
  if (uses.length || f.length) console.log(g.id, '|', uses.join(' / '), '| feat:', JSON.stringify(f));
});