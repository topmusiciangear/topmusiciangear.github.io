const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  418: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN 418:', t.slice(i, j + 1));
const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
const ci = g.productTable.columns.findIndex(c => c.title === 'Allen & Heath SQ-6');
console.log('SQ6 col idx:', ci);
g.productTable.rows.forEach(r => console.log('ROW ' + r.label + ' | SQ6: ' + JSON.stringify(r.values[ci])));
const vi = (g.verdictProsCons || []).findIndex(v => v.name === 'Allen & Heath SQ-6');
console.log('VERDICT:', JSON.stringify(g.verdictProsCons[vi], null, 1).slice(0, 2000));