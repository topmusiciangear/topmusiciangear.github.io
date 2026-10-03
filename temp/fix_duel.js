const fs = require('fs');
const G = require('../data/guides.json');
const g = G.find(x => x.id === 'pro-microphones');
g.sections[0].products = g.sections[0].products.filter(id => id !== 292);
g.sections[1].products = g.sections[1].products.filter(id => id !== 290 && id !== 292);
g.sections[2].products = g.sections[2].products.filter(id => id !== 39);
console.log(g.sections.map(s => s.heading + ' -> ' + JSON.stringify(s.products)).join('\n'));
fs.writeFileSync('../data/guides.json', JSON.stringify(G, null, 2));
const t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  187: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN187: ' + t.slice(start, i + 1).replace(/\s+/g, ' '));