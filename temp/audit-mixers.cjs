const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const a = Array.isArray(p) ? p : (p.products || []);
const byId = i => a.find(v => v.id === i);

const q = g.find(x => x.id === 'best-digital-mixers');
console.log('featured:', JSON.stringify(q.featuredProducts));
console.log('sections:');
(q.sections || []).forEach((s, i) => console.log('  sec' + i + ':', JSON.stringify((s.products || []).map(id => id + '=' + (byId(id) ? byId(id).title : '??')))));

console.log('verdictProsCons ids:');
const v = Array.isArray(q.verdictProsCons) ? q.verdictProsCons : (q.verdictProsCons && q.verdictProsCons.list) || [];
v.forEach(x => console.log('  ' + x.id + ': ' + (byId(x.id) ? byId(x.id).title : '??')));

console.log('productTable columns:');
(q.productTable.columns || []).forEach(c => console.log('  - ' + c.title));

console.log('productTable row count:', (q.productTable.rows || []).length);

// cross-check: products in sections/verdicts but NOT in table, and vice versa
const tcols = (q.productTable.columns || []).map(c => c.title.toLowerCase());
const allIds = new Set();
(q.sections || []).forEach(s => (s.products || []).forEach(id => allIds.add(id)));
v.forEach(x => allIds.add(x.id));
console.log('products in sections/verdicts but not table cols:');
for (const id of allIds) {
  const x = byId(id);
  if (x && !tcols.includes(x.title.toLowerCase())) console.log('  ' + id + ': ' + x.title + ' [' + x.category + ']');
}