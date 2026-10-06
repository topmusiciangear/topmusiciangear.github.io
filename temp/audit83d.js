const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
console.log('=== featuredSnippet keys:', Object.keys(g.featuredSnippet || {}).join(', '));
const fsn = g.featuredSnippet || {};
const items = fsn.items || fsn.qa || fsn.questions || [];
console.log('items:', items.length);
items.forEach((q, i) => console.log(i + ':', (q.title_en || q.q || q.question || JSON.stringify(q)).toString().slice(0, 90)));
console.log('\n=== TABLE FULL ===');
const t = g.productTable;
const cols = t.columns.map(c => (c.title || '').toString());
console.log('COLS:', cols.join(' | '));
(t.rows || []).forEach((r, ri) => {
  const label = r.label || r.name || r.title || ('row' + ri);
  const cells = r.cells || r.values || r.cols || [];
  console.log('--- ' + JSON.stringify(label).slice(0, 60));
  cells.forEach((c, ci) => {
    const v = typeof c === 'string' ? c : (c.value || c.en || JSON.stringify(c));
    console.log('  [' + cols[ci + 1] + ']: ' + v.toString().slice(0, 120));
  });
});
