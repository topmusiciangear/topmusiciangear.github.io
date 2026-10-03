const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  414: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN 414:', t.slice(i, j + 1));
const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('featured:', JSON.stringify(g.featuredProducts));
console.log('cols:', g.productTable.columns.map(c => c.title).join(' / '));
console.log('rows:', g.productTable.rows.map(r => r.label).join(' | '));
console.log('verdicts:', (g.verdictProsCons || []).map(v => v.name).join(' / '));
g.sections.forEach((s, n) => { if ((s.products || []).includes(414)) console.log('SEC' + n + ' h: ' + s.heading + '\nES h: ' + s.heading_es + '\nEN: ' + (s.content || '').replace(/\s+/g, ' ').slice(0, 900) + '\nES: ' + (s.content_es || '').replace(/\s+/g, ' ').slice(0, 900)); });
const sAll = JSON.stringify(g);
['SQ-6', 'SQ6', 'SQ 6'].forEach(k => console.log(k + ' count:', sAll.split(k).length - 1));